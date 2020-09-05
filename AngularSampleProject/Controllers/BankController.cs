using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AngularSampleProject.Models;

namespace AngularSampleProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BankController : Controller
    {

        [HttpGet("List")]
        public IEnumerable<Bank> GetList()
        {
            return Enumerable.Range(1, 5).Select(index => new Bank
            {
                Id = index,
                Name = $"Bank{index}",
                LogoUrl = $"{index}.png"
            })
             .ToArray();
        }

        [HttpGet("Count")]
        public int GetCount()
        {
            return 5;
        }

    }
}