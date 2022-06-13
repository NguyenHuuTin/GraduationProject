using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace Class
{
    public class LessonContent
    {
        [Required]
        public Guid SectionId { get; set; }

        [Required]
        public string LessonTitle { get; set; }

        [Required]
        [DataType(DataType.Upload)]
        public IFormFile File { get; set; }

        [Required]
        public int Sort { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public float Volume { get; set; }

        [Required]
        public float Duration { get; set; }
    }
}
