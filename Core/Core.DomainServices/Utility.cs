using Core.DomainModel;
using Microsoft.Extensions.Configuration;
using System;
using System.Drawing;
using System.IO;
using System.Linq.Expressions;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using Core.DomainModel.Settings;

namespace Core.DomainServices
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

        public static string CreateActivationCode()
        {
            string strActivationCode = System.Guid.NewGuid().ToString();
            int length = 8; // Number of characters to generate
            strActivationCode = strActivationCode.Replace("-", String.Empty);
            strActivationCode = strActivationCode.Substring(0, length);

            return strActivationCode;
        }

    }
}
