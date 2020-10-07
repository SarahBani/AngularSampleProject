using Core.DomainModel;
using System;

namespace Core.DomainService
{
    public class TransactionResult
    {

        #region Properties

        public bool IsSuccessful { get; private set; }

        public object Content { get; private set; }

        /// <summary>
        /// the exception we show the user
        /// </summary>
        public string CustomExceptionMessage { get; private set; }

        /// <summary>
        /// the real exception
        /// </summary>
        public ExceptionContent ExceptionContent { get; private set; }

        #endregion /Properties

        #region Constructors

        public TransactionResult(object content = null)
        {
            this.IsSuccessful = true;
            this.Content = content;
            this.CustomExceptionMessage = string.Empty;
        }

        public TransactionResult(CustomException exception, object content = null)
        {
            this.IsSuccessful = false;
            this.Content = content;
            this.CustomExceptionMessage = exception.CustomMessage;
            this.ExceptionContent = exception.Content;
        }

        #endregion /Constructors


    }
}