using System;

namespace WebAPI.Endpoints.CommentCourse
{
    public class CommentResponse
    {
        public Guid id { get; set; }

        public string user { get; set; }

        public string comment { get; set; }

        public string createAt { get; set; }

        public string avatar { get; set; }
    }
}
