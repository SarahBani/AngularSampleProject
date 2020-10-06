using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Core.DomainService;
using System;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class EmailService : IEmailService
    {

        #region Methods

        public async Task<TransactionResult> SendEmailAsync(string email, string message)
        {
            try
            {
                if (await SendEmailAsync(email,
                    email, WebRequestConfig.WebSiteEmail.Address, "User Email", message))
                {
                    return new TransactionResult();
                }
                else
                {
                    return new TransactionResult(new CustomException(ExceptionKey.SendEmailProblem));
                }
            }
            catch (Exception ex)
            {
                return new TransactionResult(new CustomException(ex));
            }
        }

        private async Task<bool> SendEmailAsync(string displayName,
            string senderEmail,
            string receiverEmail,
            string subject,
            string body)
        {
            var message = GetMailMessage(displayName, senderEmail, receiverEmail, subject, body);
            var client = Utility.GetSmtpClient();
            try
            {
                await client.SendMailAsync(message);

                // Set the method that is called back when the send operation ends.
                //client.SendCompleted += new SendCompletedEventHandler(SendCompletedCallback);
                // The userState can be any object that allows your callback
                // method to identify this send operation.
                // For this example, the userToken is a string constant.
                //string userState = Utility.GenerateCode();
                //client.SendAsync(message, userState);
                //Console.WriteLine("Sending message... press c to cancel mail. Press any other key to exit.");
                //string answer = Console.ReadLine();
                //// If the user canceled the send, and mail hasn't been sent yet,
                //// then cancel the pending operation.
                //if (answer.StartsWith("c") && !_hasSent)
                //{
                //    client.SendAsyncCancel();
                //}
                return true;
            }
            catch (Exception ex)
            {
                //Utility.SaveError(ex.GetBaseException());
                return false;
            }
            finally
            {
                // Clean up.
                message.Dispose();
                client.Dispose();
            }
        }

        private MailMessage GetMailMessage(string displayName,
            string senderEmail,
            string receiverEmail,
            string subject,
            string body)
        {
            // Specify the email sender.
            // Create a mailing address that includes a UTF8 character
            // in the display name.
            var message = new MailMessage(
                new MailAddress(senderEmail, displayName, Encoding.UTF8),
                new MailAddress(receiverEmail));
            //message.To.Add(receiverEmail);
            message.Priority = MailPriority.Normal;
            message.Subject = subject;
            message.SubjectEncoding = Encoding.UTF8;
            message.Body = body;
            message.BodyEncoding = Encoding.UTF8;
            //message.IsBodyHtml = true;
            //message.AlternateViews.Add(GetHtmlBody(body));

            return message;
        }

        //private  bool SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        //{
        //    // Get the unique identifier for this asynchronous operation.
        //    String token = (string)e.UserState;

        //    if (e.Cancelled)
        //    {
        //        return false;
        //    }
        //    if (e.Error != null)
        //    {
        //        Console.WriteLine("[{0}] {1}", token, e.Error.ToString());
        //    }
        //    else
        //    {
        //        Console.WriteLine("Message sent.");
        //    }
        //}

        //private static AlternateView GetHtmlBody(string content)
        //{
        //    return AlternateView.CreateAlternateViewFromString(GetHTMLText(content),
        //        Encoding.UTF8,
        //        MediaTypeNames.Text.Html);
        //}

        //private static string GetHTMLText(string content)
        //{
        //    return "<html>" +
        //                "<body style='width:100%;' dir='rtl'>" +
        //                    content +
        //                "</body>" +
        //            "</html>";
        //}

        #endregion /Methods

    }
}
