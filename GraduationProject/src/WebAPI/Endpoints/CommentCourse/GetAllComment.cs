using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.CommentCourse
{
    public class GetAllComment : BaseAsyncEndpoint
    {
        private readonly ICommentService _commentService;

        public GetAllComment(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("/Comment/{courseId}")]
        [SwaggerOperation(
            Summary = "Gets a list of all Comment",
            Description = "Gets a list of all Comment",
            OperationId = "Comment.List",
            Tags = new[] { "CommentEndpoints" })
        ]
        public async Task<ActionResult<List<CommentResponse>>> GetAllAsync(Guid courseId, CancellationToken cancellationToken = default)
        {
            var items = (await _commentService.GetListComment(courseId)).OrderBy(x => x.CreateAt);
            var response= items.Select(item => new CommentResponse
                {
                    id = item.Id,
                    user = item.User.UserName,
                    comment = item.Comment,
                    createAt = Convert.ToDateTime(item.CreateAt).ToString("dd MMMM yyyy"),
                    avatar = item.User.Avatar
                });
                

            return Ok(response);
        }


        [HttpPost("/Comment")]
        [SwaggerOperation(
            Summary = "Gets a list of all Comment",
            Description = "Gets a list of all Comment",
            OperationId = "Comment.List",
            Tags = new[] { "CommentEndpoints" })
        ]
        public async Task<ActionResult<bool>> AddCommentAsync([FromBody]CommentResponse response, CancellationToken cancellationToken = default)
        {
            var userId = GetLoggedUserId();
            QuestionAndAnswer questionAndAnswer = new QuestionAndAnswer();
            questionAndAnswer.UserId = userId;
            questionAndAnswer.CourseId = response.id;
            questionAndAnswer.Comment = response.comment;
            questionAndAnswer.CreateAt = DateTime.Now;

            var result = await _commentService.AddComment(questionAndAnswer);

            return Ok(result);
        }


        private Guid GetLoggedUserId()
        {
            if (!User.Identity.IsAuthenticated)
                throw new System.Security.Authentication.AuthenticationException();

            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return Guid.Parse(userId);
        }
    }
}
