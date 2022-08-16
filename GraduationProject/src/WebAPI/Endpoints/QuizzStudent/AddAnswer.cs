using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.QuizzStudent
{
    public class AddAnswer : BaseAsyncEndpoint
    {
        private readonly IQuizzService _quizzService;

        public AddAnswer(IQuizzService quizzService)
        {
            _quizzService = quizzService;
        }

        [HttpPost("/Quizz/AddAnswerStudent")]
        [SwaggerOperation(
            Summary = "Check complete quizz",
            Description = "Check complete quizz",
            OperationId = "Quizz.add",
            Tags = new[] { "QuizzStudentEndpoints" })
        ]
        public async Task<ActionResult<bool>> AddAnswerStudentAsync([FromBody] AddAnswerRequest request, CancellationToken cancellationToken)
        {
            var userId = GetLoggedUserId();
            QuizzAnswer quizzAnswer = await _quizzService.GetQuizzAnswer(request.questionId);
            if (quizzAnswer.Content.Equals(request.answer))
            {
                var result = await _quizzService.AddUserAnswer(userId, quizzAnswer.Id);
                return Ok(result);
            }
           return Ok(false);

        }

       [HttpGet("/Quizz/Checkcompletequizz/{quizzId}")]
        [SwaggerOperation(
            Summary = "Check complete quizz",
            Description = "Check complete quizz",
            OperationId = "Quizz.Checkcompletequizz",
            Tags = new[] { "QuizzStudentEndpoints" })
        ]
        public async Task<ActionResult<bool>> CheckcompletequizzAsync(Guid quizzId, CancellationToken cancellationToken)
        {
            var userId = GetLoggedUserId();
            var result = await _quizzService.CheckCompleteQuizz(userId, quizzId);
            return Ok(result);
        }

        [HttpPost("/Quizz/CompleteQuizz")]
        [SwaggerOperation(
            Summary = "complete quizz",
            Description = "Complete quizz",
            OperationId = "Quizz.Completequizz",
            Tags = new[] { "QuizzStudentEndpoints" })
        ]
        public async Task<ActionResult<int>> CompletequizzAsync([FromBody]CompleteRequest res, CancellationToken cancellationToken)
        {
            var userId = GetLoggedUserId();
            var numb = (await _quizzService.GetAllQuizzAnswer(userId)).Count();
            if ((numb / res.numQuizz) >= 0.8)
            {
                var result = await _quizzService.CheckCompleteQuizz(userId, res.quizzId);
                if (!result)
                {
                    await _quizzService.AddQuizzComplete(userId, res.quizzId);
                }

                await _quizzService.DeleteUserQuizzAnswer(userId);
                return Ok(numb);
            }

            else
            {
                await _quizzService.DeleteUserQuizzAnswer(userId);
                return Ok(numb);
            }
        }

        [HttpPost("/Quizz/AddCourseComplete/{courseId}")]
        [SwaggerOperation(
            Summary = "Add Course Complete",
            Description = "Add Course Complete",
            OperationId = "Quizz.AddCourseComplete",
            Tags = new[] { "QuizzStudentEndpoints" })
        ]
        public async Task<ActionResult<CourseCompletion>> AddCourseCompleteAsync(Guid courseId, CancellationToken cancellationToken)
        {
            var userId = GetLoggedUserId();
            return await _quizzService.AddCourseComplete(userId, courseId);
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
