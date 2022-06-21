using Ardalis.ApiEndpoints;
using Class;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class UpdateCourse : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;

        public UpdateCourse(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPut("/Course/Update")]
        [SwaggerOperation(
            Summary = "Updates a Course",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.Update",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Course>> HandleAsync(UpdateCourseRequest request, CancellationToken cancellationToken = default)
        {
            var item = await _courseService.GetDetailCourse(request.CourseId);
            item.Description = request.Description;
            item.Title = request.Title;
            item.Subtitle = request.Subtitle;
            item.OriginPrice = request.OriginPrice;
            item.Status = request.Status;
            item.TrailerUrl = request.TrailerUrl;
            item.ImageUrl = request.ImageUrl;
            
            await _courseService.UpdateCourse(item, request.Image, request.Video);
            return Ok(item);
        }


        [HttpPost("/Course/Update/Section")]
        [SwaggerOperation(
            Summary = "Updates a Course's section",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.Update.Section",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Section>> UpdateSectionAsync([FromBody]UpdateSectionRequast request, CancellationToken cancellationToken = default)
        {
            var item = await _courseService.GetSection(request.id);
            item.Title = request.title;

            await _courseService.UpdateSection(item);
            return Ok(item);
        }

        [HttpPost("/Course/Update/Lecture")]
        [SwaggerOperation(
            Summary = "Updates a Course's Lecture",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.Update.Lecture",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> UpdateLectureAsync([FromForm] LessonContent request, CancellationToken cancellationToken = default)
        {
            var item = await _courseService.UpdateLesson(request);

            return Ok(item);
        }

        [HttpPost("/Course/Update/Quizz")]
        [SwaggerOperation(
            Summary = "Updates a Course's Quizz",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.Update.Quizz",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> UpdateQuizzAsync([FromBody] QuizzRequest request, CancellationToken cancellationToken = default)
        {
            Quizz quizz = await _courseService.GetQuizzById(request.id);
            quizz.Title = request.title;
            var item = await _courseService.UpdateQuizz(quizz);

            return Ok(item);
        }

        [HttpPost("/Course/Update/Question")]
        [SwaggerOperation(
            Summary = "Updates a Course's Question",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.Update.Question",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> UpdateQuestionAsync([FromBody] QuestionRequest request, CancellationToken cancellationToken = default)
        {
            QuizzQuestion quizz = await _courseService.GetQuestionById(request.id);
            if(request.htmlContent != "")
            {
                quizz.HtmlContent = request.htmlContent;
            }
            
            var item = await _courseService.UpdateQuestion(quizz);

            return Ok(item);
        }

        [HttpPost("/Course/Update/Answer")]
        [SwaggerOperation(
            Summary = "Updates a Course's Answer",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.Update.Answer",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> UpdateAnswerAsync([FromBody] AnswerRequest request, CancellationToken cancellationToken = default)
        {
            QuizzAnswer quizz = await _courseService.GetAnswerById(request.id);
            if(request.answer != "")
            {
                quizz.Content = request.answer;
            }
             
            var item = await _courseService.UpdateAnswer(quizz);

            return Ok(item);
        }
    }
}
