namespace Core.DomainModel
{
    public static class Constant
    {

        #region AppSetting

        public const string AppSetting_DefaultConnection = "DefaultConnection";
        public const string AppSetting_WebSiteEmailAddress = "WebSiteEmailAddress";
        public const string AppSetting_WebSiteEmailName = "WebSiteEmailName";

        #endregion /AppSetting

        #region Exceptions

        public const string Exception_HasError = "An error has occured!";

        public const string Exception_InvalidModelState = "Data is invalid!";
        public const string Exception_InvalidRequestData = "Request data is invalid!";
        public const string Exception_EmptyFile = "The file is empty!";

        public const string Exception_NoActiveTransaction = "There is no active transation!";
        public const string Exception_SendEmailProblem = "There was a problem in sending email!";

        public const string Exception_sql_TimeoutExpired = "Database timeout has expired!";
        public const string Exception_sql_HasDepandantInfo = "The record has depandant information!";
        public const string Exception_sql_HasDuplicateInfo = "The record has duplicate information!";
        public const string Exception_sql_KeyAlreadyExsits = "The record key already exists!";
        public const string Exception_sql_ArithmeticOverflow = "The record field value is too big!";

        #endregion /Exceptions

        public const string ActionResult_Successful = "Successful";

    }
}
