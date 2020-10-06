using Core.DomainModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Drawing.Imaging;
using System.IO;
using System.Linq.Expressions;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using Core.DomainModel.Settings;
using Microsoft.AspNetCore.Http;
using System.Drawing;

namespace Core.DomainService
{
    public static class Utility
    {

        public static string GetConnectionString(IConfiguration config)
        {
            return config.GetConnectionString(Constant.AppSetting_DefaultConnection);
        }

        public static T GetApplicationSettingSecion<T>(IConfiguration config)
            where T : class, ISetting
        {
            return config.GetSection(typeof(T).Name).Get<T>();
        }

        public static string GetApplicationSetting(IConfiguration config, string key)
        {
            return config.GetSection(key).Value;
        }

        public static Expression<Func<T, K>> GetRelatedPropertyExpression<T, K>(string property)
        {
            var param = Expression.Parameter(typeof(T), "q");
            var body = Expression.PropertyOrField(param, property);
            var lambda = Expression.Lambda<Func<T, K>>(body, param);

            return lambda;
        }

        #region Image

        public static string UploadImage(IFormFile file, string subFolderName) =>
            UploadFile(file, Path.Combine("Images", subFolderName));

        public static string UploadFile(IFormFile file, string resourceFolderPath)
        {
            var directoryRelativePath = Path.Combine("Resources", resourceFolderPath);
            var directoryFullPath = Path.Combine(Directory.GetCurrentDirectory(), directoryRelativePath);
            string fileName = GetUniqueFileName(file.FileName);
            var fileFullPath = Path.Combine(directoryFullPath, fileName);
            using (var stream = new FileStream(fileFullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            string fileRelativePath = Path.Combine(directoryRelativePath, fileName);
            return fileRelativePath;
        }

        public static void DeleteFile(string fileRelativePath)
        {
            var fileFullPath = Path.Combine(Directory.GetCurrentDirectory(), fileRelativePath);
            if (File.Exists(fileFullPath))
            {
                File.Delete(fileFullPath);
            }
        }

        private static string GetUniqueFileName(string fileName)
        {
            string fullFileName = Path.GetFileName(fileName);
            return $"{ Guid.NewGuid().ToString() + Path.GetExtension(fullFileName) }";
        }

        /// <summary>
        /// If you want to save the file as bytearray/varbinary to your database, 
        /// you may convert the IFormFile object to byte array like this
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static byte[] GetByteArrayFromImage(IFormFile file)
        {
            using (var target = new MemoryStream())
            {
                file.CopyTo(target);
                return target.ToArray();
            }
        }

        // Resize an Image File   
        public static Bitmap ResizeImage(Stream fileStream, int width, int height)
            => ResizeImage(new Bitmap(fileStream), width, height);

        // Resize an Image File with preserve aspect ratio
        public static Bitmap ResizeRatioImage(Stream fileStream, int maxWidth, int maxHeight)
            => ResizeRatioImage(new Bitmap(fileStream), maxWidth, maxHeight);

        // Resize a Bitmap   
        public static Bitmap ResizeImage(Bitmap image, int width, int height)
        {
            Bitmap resizedImage = new Bitmap(width, height, PixelFormat.Format32bppRgb);
            using (Graphics gfx = Graphics.FromImage(resizedImage))
            {
                gfx.DrawImage(image, new Rectangle(0, 0, width, height),
                                     new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
            }
            image.Dispose();
            return resizedImage;
        }

        // Resize a Bitmap with preserve aspect ratio   
        public static Bitmap ResizeRatioImage(Bitmap image, int maxWidth, int maxHeight)
        {
            int newWidth = maxWidth;
            int newHeight = maxHeight;
            if ((decimal)image.Width / (decimal)maxWidth > (decimal)image.Height / (decimal)maxHeight)
            {
                newWidth = maxWidth;
                newHeight = (int)Math.Round((maxWidth / (double)image.Width) * image.Height);
            }
            else
            {
                newHeight = maxHeight;
                newWidth = (int)Math.Round((maxHeight / (double)image.Height) * image.Width);
            }

            Bitmap resizedImage = new Bitmap(newWidth, newHeight, PixelFormat.Format32bppRgb);
            using (Graphics gfx = Graphics.FromImage(resizedImage))
            {
                gfx.DrawImage(image, new Rectangle(0, 0, newWidth, newHeight),
                                     new Rectangle(0, 0, image.Width, image.Height), GraphicsUnit.Pixel);
            }
            image.Dispose();
            return resizedImage;
        }

        public static byte[] BitmapToBytes(Bitmap image)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                image.Save(stream, ImageFormat.Png);
                return stream.ToArray();
            }
        }

        #endregion /Image

        #region Encryption

        public static string Encrypt(string text)
        {
            RijndaelManaged RijndaelCipher = new RijndaelManaged();
            string Password = "CSC";
            byte[] PlainText = System.Text.Encoding.Unicode.GetBytes(text);
            byte[] Salt = Encoding.ASCII.GetBytes(Password.Length.ToString());
            PasswordDeriveBytes SecretKey = new PasswordDeriveBytes(Password, Salt);
            //Creates a symmetric encryptor object. 
            ICryptoTransform Encryptor = RijndaelCipher.CreateEncryptor(SecretKey.GetBytes(32), SecretKey.GetBytes(16));
            MemoryStream memoryStream = new MemoryStream();
            //Defines a stream that links data streams to cryptographic transformations
            CryptoStream cryptoStream = new CryptoStream(memoryStream, Encryptor, CryptoStreamMode.Write);
            cryptoStream.Write(PlainText, 0, PlainText.Length);
            //Writes the final state and clears the buffer
            cryptoStream.FlushFinalBlock();
            byte[] CipherBytes = memoryStream.ToArray();
            memoryStream.Close();
            cryptoStream.Close();
            string EncryptedData = Convert.ToBase64String(CipherBytes);

            return EncryptedData;
        }

        public static string Decrypt(string text)
        {
            RijndaelManaged RijndaelCipher = new RijndaelManaged();

            string Password = "CSC";
            string DecryptedData;

            try
            {
                byte[] EncryptedData = Convert.FromBase64String(text);

                byte[] Salt = Encoding.ASCII.GetBytes(Password.Length.ToString());
                //Making of the key for decryption
                PasswordDeriveBytes SecretKey = new PasswordDeriveBytes(Password, Salt);
                //Creates a symmetric Rijndael decryptor object.
                ICryptoTransform Decryptor = RijndaelCipher.CreateDecryptor(SecretKey.GetBytes(32), SecretKey.GetBytes(16));

                MemoryStream memoryStream = new MemoryStream(EncryptedData);
                //Defines the cryptographics stream for decryption.THe stream contains decrpted data
                CryptoStream cryptoStream = new CryptoStream(memoryStream, Decryptor, CryptoStreamMode.Read);

                byte[] PlainText = new byte[EncryptedData.Length];
                int DecryptedCount = cryptoStream.Read(PlainText, 0, PlainText.Length);
                memoryStream.Close();
                cryptoStream.Close();

                //Converting to string
                DecryptedData = Encoding.Unicode.GetString(PlainText, 0, DecryptedCount);
            }
            catch
            {
                DecryptedData = text;
            }
            return DecryptedData;
        }

        public static string UrlEncode(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }
            byte[] bytesToEncode = UTF8Encoding.UTF8.GetBytes(text);
            // Special "url-safe" base64 encode
            return Convert.ToBase64String(bytesToEncode)
                .Replace("=", "")
                .Replace('+', '-')
                .Replace('/', '_');
        }

        public static string UrlDecode(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return text;
            }
            text = text.Replace('-', '+')
                       .Replace('_', '/');

            int paddings = text.Length % 4;
            if (paddings > 0)
            {
                text += new string('=', 4 - paddings);
            }

            byte[] encodedDataAsBytes = Convert.FromBase64String(text);
            return UTF8Encoding.UTF8.GetString(encodedDataAsBytes);
        }

        public static int GetDecodedUserId(string userKey)
        {
            return int.Parse(UrlDecode(userKey));
        }

        #endregion /Encryption

        public static string GenerateCode()
        {
            string code = Guid.NewGuid().ToString();
            int length = 10; // Number of characters to generate
            code = code.Replace("-", String.Empty);
            code = code.Substring(0, length);

            return code;
        }

        public static SmtpClient GetSmtpClient()
        {
            var webSiteEmail = WebRequestConfig.WebSiteEmail;
            return new SmtpClient()
            {
                Host = webSiteEmail.Host,
                Port = webSiteEmail.Port,
                UseDefaultCredentials =false,
                Credentials = new NetworkCredential(webSiteEmail.Username, webSiteEmail.Password),
                EnableSsl = true
            };
        }

    }
}
