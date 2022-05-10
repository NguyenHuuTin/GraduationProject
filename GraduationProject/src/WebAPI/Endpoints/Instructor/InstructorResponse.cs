using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Instructor
{
    public class InstructorResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Professional { get; set; }

        public string FacebookLink { get; set; }

        public string LinkedLink { get; set; }

        public string YoutubeLink { get; set; }

        public string TwitterLink { get; set; }

        public string ProfileLink { get; set; }

        public string Avatar { get; set; }

        public int  CountStudent { get; set; }

        public int CountCourse { get; set; }
    }
}
