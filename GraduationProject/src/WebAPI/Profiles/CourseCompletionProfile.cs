using AutoMapper;
using Core.Entities;
using Core.Mapper.CourseCompletionModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Profiles
{  
    public class CourseCompletionProfile : Profile
    {
        public CourseCompletionProfile()
        {
            //create map create coursecompletion
            CreateMap<CourseCompletion, CreateCourseCompletionRequest>();
            CreateMap<CreateCourseCompletionRequest, CourseCompletion>();

        }
    }
}
