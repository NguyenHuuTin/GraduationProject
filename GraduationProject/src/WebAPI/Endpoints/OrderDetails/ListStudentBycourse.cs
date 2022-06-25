using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.OrderDetails
{
    public class ListStudentBycourse : BaseAsyncEndpoint
    {
        private readonly IOrderDetailService _orderService;
        private readonly ICourseService _courseService;
        private readonly IUserServices _userServices;
        private readonly IQuizzService _quizzService;

        public ListStudentBycourse(IOrderDetailService service, ICourseService courseService, IUserServices userServices, IQuizzService quizzService)
        {
            _orderService = service;
            _courseService = courseService;
            _userServices = userServices;
            _quizzService = quizzService;
        }

        [HttpGet("/ListStudentByCourse/{Id}")]
        [SwaggerOperation(
            Summary = "ListStudentByCourse",
            Description = "ListStudentByCourse",
            OperationId = "ListStudent.List",
            Tags = new[] { "OrderDetailEndpoints" })
        ]
        public async Task<ActionResult<ListStudentResponse>> ListStudentAsync(Guid Id, CancellationToken cancellationToken = default)
        {
            var students = await _orderService.GetAllOrderDetailWithCourse(Id);
            var item = await _courseService.GetDetailCourse(Id);

             List<Quizz> resultQuizz = new List<Quizz>();
             List<Section> x = item.Sections.ToList();
             foreach (var section in x)
             {
                 if (_courseService.GetQuizz(section.Id) != null)
                 {
                     resultQuizz.Add(_courseService.GetQuizz(section.Id));
                 }
             }

            double totalQuizz = resultQuizz.Count;
            var listStudent = students.Select(x => new ListStudentResponse
            {
                Id = x.User.Id,
                name = x.User.UserName,
                avatar = x.User.Avatar,
                date = Convert.ToDateTime(x.PurchasedDay).ToString("dd MMMM yyyy"),
                percent = PercentComplete(x.UserId, resultQuizz, totalQuizz)
            }) ;

            return Ok(listStudent);
        }


        private double PercentComplete (Guid userId, List<Quizz> quizzs, double totalQuizz)
        {
            double dem = 0;
            
            foreach(var quizz in quizzs)
            {
                bool result = _quizzService.CheckCompleteQuizz(userId, quizz.Id).Result;
                if (result)
                {
                    dem++;
                }
            }

            if (totalQuizz == 0)
                return 0;
            else
            {
                double percent = (dem / totalQuizz) * 100;
                return percent;
            }
            
        }
    }
}
