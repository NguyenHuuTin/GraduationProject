using AutoMapper;
using Core.Entities;
using Core.Mapper.ViewModel;

namespace Core.Mapper
{
    public class MapperProfile
    {
        public class AutoMapperProfile : Profile
        {
            public AutoMapperProfile()
            {
                CreateMap<User, UserModel>().ReverseMap();
            }
        }
    }
}
