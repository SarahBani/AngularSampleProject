namespace AngularSampleProject.Models
{
    public class TransationResult
    {

        #region Properties

        public bool IsSuccessful { get; private set; }

        public string ExceptionContentResult { get; private set; }

        public ExceptionKey ExceptionKey { get; private set; }

        public object Content { get; private set; }

        #endregion /Properties

        #region Constructors

        public TransationResult()
        {
            this.IsSuccessful = true;
            this.ExceptionContentResult = string.Empty;
        }

        public TransationResult(object content) : this()
        {
            this.Content = content;
        }

        public TransationResult(CustomException exception)
        {
            this.IsSuccessful = false;
            this.ExceptionContentResult = exception.CustomMessage;
            this.ExceptionKey = exception.ExceptionKey;
        }

        #endregion /Constructors

    }
}