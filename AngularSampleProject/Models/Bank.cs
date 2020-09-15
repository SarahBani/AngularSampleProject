﻿using System.ComponentModel.DataAnnotations;

namespace AngularSampleProject.Models
{
    public class Bank : Entity<int>
    {

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters!")]
        public string Name { get; set; }

        public string LogoUrl { get; set; }

    }
}
