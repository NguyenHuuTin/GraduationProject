using Ardalis.ApiEndpoints;
using Core.Interfaces;
using WebAPI.ApiModels;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace WebAPI.Endpoints.Users
{
    
    public class ListInstructor : BaseAsyncEndpoint
    {
        public readonly IUserServices _userServices;
        public ListInstructor(IUserServices userServices)
        {
            this._userServices = userServices;
        }

        [EnableCors("MyPolicy")]
        [HttpGet("/ListInstructor")]
        [SwaggerOperation(
            Summary = "Gets a list of all ListInstructor",
            Description = "Gets a list of all ListInstructor",
            OperationId = "Users.ListInstructor",
            Tags = new[] { "UserEndpoints" })
        ]
        public async Task<ActionResult<List<ListInstructorResponse>>> GetListInstructor(CancellationToken cancellationToken = default)
        {
            var items = (await _userServices.GetAllInstructor())
                .Select(item => new ListInstructorResponse
                {
                    id = item.Id,
                    name = item.UserName,
                    avatar = item.Avatar,
                    linkFacebook = item.FacebookLink,
                    linkYoutube = item.YoutubeLink,
                    linkLinked = item.LinkedLink,
                    linkTwitter = item.TwitterLink,
                    course = item.Courses
                });
            return Ok(items);
        }


        [EnableCors("MyPolicy")]
        [HttpGet("/ListInstructor/{id}")]
        [SwaggerOperation(
            Summary = "Gets a list of all ListInstructor",
            Description = "Gets a list of all ListInstructor",
            OperationId = "Users.ListInstructor",
            Tags = new[] { "UserEndpoints" })
        ]
        public async Task<ActionResult<ListInstructorResponse>> GetListInstructorByID(Guid id, CancellationToken cancellationToken = default)
        {
            var item = (await _userServices.GetAllInstructorById(id));
            var user =  new ListInstructorResponse
            {
                id = item.Id,
                name = item.UserName,
                avatar = item.Avatar,
                linkFacebook = item.FacebookLink,
                linkYoutube = item.YoutubeLink,
                linkLinked = item.LinkedLink,
                linkTwitter = item.TwitterLink,
                course = item.Courses.Where(x => x.Status == "Active").ToList()
            };
            return Ok(user);
        }
    }
}
