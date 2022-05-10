using AutoMapper;
using Core.Entities;
using WebAPI.ApiModels.InstructorItemDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Profiles
{
    public class InstructorProfile: Profile
    {
        public InstructorProfile()
        {
            //create map list
            CreateMap<User, IntructorListReadDto>();
            CreateMap<IntructorListReadDto, User>();

            //creste map item
            CreateMap<User, InstructorItemReadDto>();
            CreateMap<InstructorItemReadDto, User>();

            //creste map updateprofilesreponse
            CreateMap<User, UpdateProfileResponse>();
            CreateMap<UpdateProfileResponse, User>();
        }
    }
}
