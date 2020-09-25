namespace AngularSampleProject.Models
{
    public class CustomActionResult
    {

        #region Properties

        public bool IsSuccessful { get; private set; }

        public string ExceptionContentResult { get; private set; }

        //public ExceptionKey ExceptionKey { get; private set; }

        public object Content { get; private set; }

        #endregion /Properties

        #region Constructors

        public CustomActionResult()
        {
            this.IsSuccessful = true;
            this.ExceptionContentResult = string.Empty;
        }

        public CustomActionResult(object content) : this()
        {
            this.Content = content;
        }

        public CustomActionResult(CustomException exception, object content = null)
        {
            this.IsSuccessful = false;
            this.ExceptionContentResult = exception.CustomMessage;
            this.Content = content;
        }

        #endregion /Constructors

    }
}