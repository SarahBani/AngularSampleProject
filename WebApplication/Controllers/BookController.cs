using Core.DomainModel.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using WebApplication.Models;
using System.Linq;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class BookController : BaseUploaderAPIController
    {

        #region Properties

        // public IBookService _bookService { get; set; }

        #endregion /Properties

        #region Constructors

        //public BookController(IBookService bookService)
        //{
        //    this._bookService = bookService;
        //}

        #endregion /Constructors

        #region Actions

        [HttpGet("ItemAsync/{id}")]
        public async Task<Book> GetItemAsync([FromRoute] int id)
        {
            // var book = await this._bookService.GetByIdAsync(id);
            //base.FilePath = book?.LogoUrl ?? string.Empty;
            //return book;
            await Task.Run(() => { });
            return GetBooks().AsQueryable().Single(q => q.Id.Equals(id));
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Book>> GetListAsync()
        {
            //return await this._bookService.GetAllAsync();
            await Task.Run(() => { });
            return GetBooks();
        }

        [HttpGet("CountAsync")]
        public async Task<int> GetCountAsync()
        {
            await Task.Run(() => { });
            return 10;
            // return await this._bookService.GetCountAsync();
        }

        [HttpPost("InsertAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Book book)
        {
            //var result = await this._bookService.InsertAsync(book);
            //if (result.IsSuccessful)
            //{
            //    if (string.IsNullOrEmpty(book.LogoUrl))
            //    {
            //        base.DeletePreviousFile();
            //    }
            //    this.FilePath = string.Empty;
            //    return base.GetOKResult();
            //}
            //else
            //{
            //    return base.GetErrorResult(result);
            //}

            await Task.Run(() => { });
            return base.GetOKResult();
        }

        [HttpPut("UpdateAsync/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Book book)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            //var result = await this._bookService.UpdateAsync(book);
            //if (result.IsSuccessful)
            //{
            //    if (string.IsNullOrEmpty(book.LogoUrl))
            //    {
            //        base.DeletePreviousFile();
            //    }
            //    this.FilePath = string.Empty;
            //    return base.GetOKResult();
            //}
            //else
            //{
            //    return base.GetErrorResult(result);
            //}

            await Task.Run(() => { });
            return base.GetOKResult();
        }

        [HttpDelete("DeleteAsync/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            // var result = await this._bookService.DeleteAsync(id);
            //if (result.IsSuccessful)
            //{
            //    base.DeletePreviousFile();
            //    return base.GetOKResult();
            //}
            //else
            //{
            //    return base.GetErrorResult(result);
            //}

            await Task.Run(() => { });
            return base.GetOKResult();
        }

        [HttpPost("UploadLogo"), DisableRequestSizeLimit]
        public IActionResult UploadLogo()
        {
            return base.UploadImage("Books");
        }

        #endregion /Actions

        private IEnumerable<Book> GetBooks()
        {
            return Enumerable.Range(1, 10).Select(index => new Book
            {
                Id = index,
                Name = $"Book {index}",
                Author = $"author {index}"
            });
        }

    }
}