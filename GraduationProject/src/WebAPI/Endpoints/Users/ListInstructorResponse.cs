using Core.Entities;
using System;
using System.Collections.Generic;

namespace WebAPI.Endpoints.Users
{
    public class ListInstructorResponse
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
        public string linkYoutube { get; set; }
        public string linkLinked { get; set; }
        public string linkTwitter { get; set; }
        public string linkFacebook { get; set; }
        public ICollection<Course> course { get; set; }
    }
}
