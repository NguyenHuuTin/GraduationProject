using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Class
{
    public class CourseMain
    {
        [MaxLength(60), MinLength(10)]
        public string Title { get; set; }

        [MaxLength(120), MinLength(10)]
        public string SubTitle { get; set; }

        public string Description { get; set; }

        [Required]
        public Guid LanguageId { get; set; }

        [Required]
        public Guid SubCategoryId { get; set; }

        public Guid PromotionId { get; set; }

        [Required]
        public bool IsFree { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        [Required]
        [DataType(DataType.Upload)]
        public IFormFile BackgroupCourse { get; set; }
    }
}
