using Ardalis.Result;
using Core.Entities;
using Core.Interfaces;
using SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class DashboardService : IDashboardService
    {

        private readonly IInstructorRepository _instructorRepository;
        public DashboardService(IInstructorRepository instructorRepository)
        {        
            _instructorRepository = instructorRepository;
        }

        public async Task<Result<decimal>> GetTotalSalesByDay(Guid id)
        {
            if (id == null)
            {
                var errors = new List<ValidationError>();
                errors.Add(new ValidationError()
                {
                    Identifier = nameof(id),
                    ErrorMessage = $"{nameof(id)} is required."
                });
                return Result<decimal>.Invalid(errors);
            }

            try
            {
                //get list order detail courses of instructor
                string currentDate = DateTime.Now.ToShortDateString();
                var lstOrder = await _instructorRepository.GetInstructorByIdAsync<OrderDetail>(id)
                                                           .Include(c => c.Course)
                                                           .Where(c => c.Course.UserId.Equals(id))
                                                           .ToListAsync();

                decimal totalSale = lstOrder.FindAll(x => x.PurchasedDay.ToShortDateString().Equals(currentDate)).Sum(x => x.Price);

                return new Result<decimal>(totalSale);
            }
            catch (Exception ex)
            {
                return Result<decimal>.Error(new[] { ex.Message });
            }
        }

        public async Task<Result<int>> GetTotalCoursesByDay(Guid id)
        {
            if (id == null)
            {
                var errors = new List<ValidationError>();
                errors.Add(new ValidationError()
                {
                    Identifier = nameof(id),
                    ErrorMessage = $"{nameof(id)} is required."
                });
                return Result<int>.Invalid(errors);
            }

            try
            {
                string currentDate = DateTime.Now.ToShortDateString();
                var lstCourses = await _instructorRepository.GetInstructorByIdAsync<Course>(id)
                                                      .Where(c => c.UserId.Equals(id))
                                                      .ToListAsync();

                int totalCourses = lstCourses.FindAll(x => x.CreateAt.ToShortDateString().Equals(currentDate)).Count();
                return new Result<int>(totalCourses);
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        //get all courses are enrolled of instructor
        public async Task<Result<int>> GetTotalEnrollmentsByDay(Guid id)
        {
            if (id == null)
            {
                var errors = new List<ValidationError>();
                errors.Add(new ValidationError()
                {
                    Identifier = nameof(id),
                    ErrorMessage = $"{nameof(id)} is required."
                });
                return Result<int>.Invalid(errors);
            }

            try
            {
                string currentDate = DateTime.Now.ToShortDateString();
                //get lisst courses enrolled of instructor (list has duplicate courses)
                var lstEnrollments = await _instructorRepository.GetInstructorByIdAsync<Enrollment>(id)
                                                                .Include(x => x.Course)
                                                                .Where(c => c.Course.UserId.Equals(id))                                                              
                                                                .ToListAsync();

                //remove duplicate courses
                var lstCourseDistinct = new List<Course>();

                foreach(Enrollment item in lstEnrollments)
                {
                    if (!lstCourseDistinct.Contains(item.Course))
                    {
                        lstCourseDistinct.Add(item.Course);
                    }
                }
             
                return new Result<int>(lstCourseDistinct.Count());
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        public async Task<Result<int>> GetTotalSubcribersByDay(Guid id)
        {
            if (id == null)
            {
                var errors = new List<ValidationError>();
                errors.Add(new ValidationError()
                {
                    Identifier = nameof(id),
                    ErrorMessage = $"{nameof(id)} is required."
                });
                return Result<int>.Invalid(errors);
            }

            try
            {
                string currentDate = DateTime.Now.ToShortDateString();
                var lstSubcriber = await _instructorRepository.GetInstructorByIdAsync<Subscription>(id)                                                    
                                                      .Where(c => c.UserId.Equals(id))
                                                      .ToListAsync();                                                    


                int totalSubcribers = lstSubcriber.FindAll(x => x.CreateAt.ToShortDateString().Equals(currentDate)).Count();
                return new Result<int>(totalSubcribers);
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        public async Task<Result<int>> GetTotalStudentsByDay(Guid id)
        {
            if (id == null)
            {
                var errors = new List<ValidationError>();
                errors.Add(new ValidationError()
                {
                    Identifier = nameof(id),
                    ErrorMessage = $"{nameof(id)} is required."
                });
                return Result<int>.Invalid(errors);
            }

            try
            {
                string currentDate = DateTime.Now.ToShortDateString();
                var lstEnrollments = await _instructorRepository.GetInstructorByIdAsync<Enrollment>(id)
                                                      .Include(x=>x.Course)
                                                      .Where(x => x.Course.UserId.Equals(id))
                                                      .ToListAsync();


                int totalStudents = lstEnrollments.FindAll(x => x.CreateAt.ToShortDateString().Equals(currentDate)).Count();
                return new Result<int>(totalStudents);
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }

        }

        public async Task<Result<int>> GetTotalViewsByDay(Guid id)
        {
            if (id == null)
            {
                var errors = new List<ValidationError>();
                errors.Add(new ValidationError()
                {
                    Identifier = nameof(id),
                    ErrorMessage = $"{nameof(id)} is required."
                });
                return Result<int>.Invalid(errors);
            }

            try
            {
                string currentDate = DateTime.Now.ToShortDateString();          
                var lstCourseCompletion = await _instructorRepository.GetInstructorByIdAsync<CourseCompletion>(id)
                                                                .Include(x => x.Course)
                                                                .Where(c => c.Course.UserId.Equals(id))
                                                                .ToListAsync();

                return new Result<int>(lstCourseCompletion.Count());
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }
    }
}

