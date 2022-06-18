using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
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

        [HttpPost("/Comment")]
        [SwaggerOperation(
            Summary = "Gets a list of all Comment",
            Description = "Gets a list of all Comment",
            OperationId = "Comment.List",
            Tags = new[] { "CommentEndpoints" })
        ]
        public async Task<ActionResult<List<Comment>>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var items = await _commentService.GetListComment();

            return Ok(items);
        }
    }
}
