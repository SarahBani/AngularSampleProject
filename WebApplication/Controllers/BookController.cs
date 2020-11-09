using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.DomainModel.Collections;
using Core.ApplicationService.Contracts;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class BookController : BaseUploaderAPIController
    {

        #region Properties

        public IBookService _bookService { get; set; }

        #endregion /Properties

        #region Constructors

        public BookController(IBookService bookService)
        {
            this._bookService = bookService;
        }

        #endregion /Constructors

        #region Actions

        [HttpGet("ItemAsync/{id:length(24)}")]
        public async Task<Book> GetItemAsync([FromRoute] string id)
        {
            return await this._bookService.GetByIdAsync(id);
        }
                
        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Book>> GetListAsync()
        {
            return await this._bookService.GetAllAsync();
        }

        [HttpGet("CountAsync")]
        public async Task<long> GetCountAsync()
        {
            return await this._bookService.GetCountAsync();
        }
       
        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Book book)
        {
            var result = await this._bookService.InsertAsync(book);
            if (result.IsSuccessful)
            {
                if (string.IsNullOrEmpty(book.CoverImageUrl))
                {
                    base.DeletePreviousFile();
                }
                this.FilePath = string.Empty;
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }

        [HttpPut("[action]/{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] string id, [FromBody] Book book)
        {
            if (string.IsNullOrEmpty(id))
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._bookService.UpdateAsync(book);
            if (result.IsSuccessful)
            {
                if (string.IsNullOrEmpty(book.CoverImageUrl))
                {
                    base.DeletePreviousFile();
                }
                this.FilePath = string.Empty;
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }

        [HttpPut("[action]/{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertCommentAsync([FromRoute] string id, [FromBody] BookComment bookComment)
        {
            if (string.IsNullOrEmpty(id))
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._bookService.InsertCommentAsync(id, bookComment);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }

        [HttpDelete("[action]/{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._bookService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                base.DeletePreviousFile();
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }

        [HttpPost("[action]"), DisableRequestSizeLimit]
        public IActionResult UploadCoverImage()
        {
            return base.UploadImage("Books");
        }

        #endregion /Actions     

    }
}