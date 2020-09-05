using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AngularSampleProject.Models;

namespace AngularSampleProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BranchController : Controller
    {

        [HttpGet("List")]
        public IEnumerable<Branch> GetListByBankId(int bankId)
        {
            return Enumerable.Range(1, 10).Select(index => new Branch
            {
                Id = index,
                BankId = bankId,
                Name = $"Branch{index}",
                Code = index.ToString()
            })
             .ToArray();
        }

        [HttpGet("Count")]
        public int GetCountByBankId(int bankId)
        {
            return 10;
        }

    }
}