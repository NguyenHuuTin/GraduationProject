using System.Threading;
using Ardalis.ApiEndpoints;
using Core.Entities;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Core.Interfaces;
using System;
using System.Linq;
using System.Security.Claims;
using Class;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Endpoints.Courses
{
    public class Create : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;

        public Create(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [DisableRequestSizeLimit]
        [HttpPost("/Courses/Information")]
        [SwaggerOperation(
            Summary = "Creates a new Course",
            Description = "Creates a new Course",
            OperationId = "Course.Create",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Guid>> CreateGenaralInformationAsync([FromForm]CourseMain request, CancellationToken cancellationToken)
        {
           
            if (ModelState.IsValid)
            {
                var userID = GetLoggedUserId();
                //var userID = Guid.Parse("585fc085-a50c-4427-81f9-08da43a4831b");

                //create course
                var createdItem = await _courseService.CreateCourseWithImg(request, userID);

                return Ok(createdItem.Id);
            }

            return Ok();
        }

        [DisableRequestSizeLimit]
        [HttpPost("/Courses/Content")]
        [SwaggerOperation(
            Summary = "Creates a Course Content",
            Description = "Creates the Sections and Lessons",
            OperationId = "CourseContent.Create",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Guid>> CreateCourseContentAsync( [FromForm] CourseContent request, CancellationToken cancellationToken)
        {
            //check Course must be owned by User logged in
            if (await _courseService.CheckCourseOfUser(request.CourseId, GetLoggedUserId()))
            {
                //check value of request
                if (ModelState.IsValid)
                {
                    //create and return to result of that
                    return Ok(await _courseService.CreateCourseContent(request));
                }

                return BadRequest();
            }

            return Unauthorized();
        }


        [DisableRequestSizeLimit]
        [HttpPost("/Courses/Section")]
        [SwaggerOperation(
            Summary = "Creates a Course Section",
            Description = "Creates the Sections",
            OperationId = "CourseSection.Create",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Guid>> CreateCourseSectionAsync([FromForm] CourseSectionResponse request, CancellationToken cancellationToken)
        {
            //check Course must be owned by User logged in
            if (await _courseService.CheckCourseOfUser(request.CourseId, GetLoggedUserId()))
            {
                //check value of request
                if (ModelState.IsValid)
                {
                    Section section = new Section();
                    section.CourseId = request.CourseId;
                    section.Title = request.CourseContentTitle;
                    section.CreateAt = DateTime.Now;
                    section.UpdateAt = DateTime.Now;
                    return Ok(await _courseService.CreateCourseSection(section));
                }

                return BadRequest();
            }

            return Unauthorized();
        }


        [DisableRequestSizeLimit]
        [HttpPost("/Courses/Lesion")]
        [SwaggerOperation(
            Summary = "Creates a Course Lesion",
            Description = "Creates the Lesion",
            OperationId = "CourseLesion.Create",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Guid>> CreateCourseLesionAsync([FromForm] LessonContent request, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                return Ok(await _courseService.AddLesson(request));
            }

            return BadRequest();

        }


        [HttpPost("/Courses/Quizz")]
        [SwaggerOperation(
                Summary = "Creates a Course Quizz",
                Description = "Creates the Quizz",
                OperationId = "CourseQuizz.Create",
                Tags = new[] { "CourseEndpoints" })
            ]
        public async Task<ActionResult<bool>> CreateQuizzAsync([FromBody] QuizzRequest request, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                var quizz = new Quizz();
                quizz.SectionId = request.id;
                quizz.Title = request.title;
                quizz.CreateAt = DateTime.Now;
                return Ok(await _courseService.AddQuizz(quizz));
            }

            return BadRequest();

        }

        [HttpPost("/Courses/Question")]
        [SwaggerOperation(
                Summary = "Creates a Course Question",
                Description = "Creates the Question",
                OperationId = "CourseQuestion.Create",
                Tags = new[] { "CourseEndpoints" })
            ]
        public async Task<ActionResult<bool>> CreateQuestionAsync([FromBody] QuestionRequest request, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                var question = new QuizzQuestion();
                question.QuizzId = request.id;
                question.HtmlContent = request.htmlContent;
                question.CreateAt = DateTime.Now;
                question.Title = "a";
                return Ok(await _courseService.AddQuestion(question));
            }

            return BadRequest();

        }

        [HttpPost("/Courses/Answer")]
        [SwaggerOperation(
                Summary = "Creates a Course Answer",
                Description = "Creates the Answer",
                OperationId = "CourseAnswer.Create",
                Tags = new[] { "CourseEndpoints" })
            ]
        public async Task<ActionResult<Guid>> CreateAnswerAsync([FromBody] AnswerRequest request, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                var answer = new QuizzAnswer();
                answer.QuestionId = request.id;
                answer.Content = request.answer;
                answer.CreateAt = DateTime.Now;
                answer.ResultDescription = request.answer;
                var result = await _courseService.AddAnswer(answer);
                return Ok(result);
            }

            return BadRequest();

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
