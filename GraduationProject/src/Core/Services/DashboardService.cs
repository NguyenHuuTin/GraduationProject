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
using Class;

namespace Core.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IInstructorRepository _instructorRepository;
        public DashboardService(IInstructorRepository instructorRepository, IOrderDetailRepository orderDetailRepository)
        {        
            _instructorRepository = instructorRepository;
            _orderDetailRepository = orderDetailRepository;
        }

        public async Task<decimal> GetTotalSalesByDay(Guid id)
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

               // decimal totalSale = lstOrder.FindAll(x => x.PurchasedDay.ToShortDateString().Equals(currentDate)).Sum(x => x.Price);
                decimal totalSale = lstOrder.Sum(x => x.Price);

                return totalSale;
            }
            catch (Exception ex)
            {
                return Result<decimal>.Error(new[] { ex.Message });
            }
        }

        public async Task<int> GetTotalCoursesByDay(Guid id)
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
                return totalCourses;
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        //get all courses are enrolled of instructor
        public async Task<int> GetTotalEnrollmentsByDay(Guid id)
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
             
                return lstCourseDistinct.Count();
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        public async Task<int> GetTotalSubcribersByDay(Guid id)
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
                return totalSubcribers;
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        public async Task<int> GetTotalStudentsByDay(Guid id)
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
                return totalStudents;
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }

        }

        public async Task<int> GetTotalViewsByDay(Guid id)
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

                return lstCourseCompletion.Count();
            }
            catch (Exception ex)
            {
                return Result<int>.Error(new[] { ex.Message });
            }
        }

        public async Task<Dashboard> GetTotal(Guid id)
        {
            try
            {
                string currentDate = DateTime.Now.ToShortDateString();

                //TotalSale
                var lstOrder = await _instructorRepository.GetInstructorByIdAsync<OrderDetail>(id)
                                                           .Include(c => c.Course)
                                                           .Where(c => c.Course.UserId.Equals(id))
                                                           .ToListAsync();

                decimal totalSaleByDay = lstOrder.FindAll(x => x.PurchasedDay.ToShortDateString().Equals(currentDate)).Sum(x => x.Price);
                decimal totalSale = lstOrder.Sum(x => x.Price);

                // totalCourse
                var lstCourses = await _instructorRepository.GetInstructorByIdAsync<Course>(id)
                                                      .Where(c => c.UserId.Equals(id))
                                                      .ToListAsync();

                int totalCoursesByDay = lstCourses.FindAll(x => x.CreateAt.ToShortDateString().Equals(currentDate)).Count();
                int totalCourses = lstCourses.Count();

                //TotalEnrollment

                var lstEnrollments = await _instructorRepository.GetInstructorByIdAsync<OrderDetail>(id)
                                                                .Include(x => x.Course)
                                                                .Where(c => c.Course.UserId.Equals(id))
                                                                .ToListAsync();

                //remove duplicate courses
                var lstCourseDistinct = new List<Course>();

                foreach (OrderDetail item in lstEnrollments)
                {
                    if (!lstCourseDistinct.Contains(item.Course))
                    {
                        lstCourseDistinct.Add(item.Course);
                    }
                }

                var totalEnrollment = lstCourseDistinct.Count();
                var totalEnrollmentByDay = lstCourseDistinct.FindAll(x => x.CreateAt.ToShortDateString().Equals(currentDate)).Count();

                //TotalStudent
                var lstStudent = await _instructorRepository.GetInstructorByIdAsync<OrderDetail>(id)
                                                     .Include(x => x.Course)
                                                     .Where(x => x.Course.UserId.Equals(id))
                                                     .ToListAsync();


                int totalStudents = lstStudent.GroupBy(y=> y.UserId).Count();
                int totalStudentsByDay = lstStudent.FindAll(x => x.PurchasedDay.ToShortDateString().Equals(currentDate)).GroupBy(y => y.UserId).Count();


                //TotalSubsctriver

                var lstSubcriber = await _instructorRepository.GetInstructorByIdAsync<Subscription>(id)
                                                      .Where(c => c.UserId.Equals(id))
                                                      .ToListAsync();


                int totalSubcribers = lstSubcriber.Count();
                int totalSubcribersByDay = lstSubcriber.FindAll(x => x.CreateAt.ToShortDateString().Equals(currentDate)).Count();


                var dashBoard = new Dashboard();
                dashBoard.TotalCourse = totalCourses;
                dashBoard.TotalCourseByDay = totalCoursesByDay;
                dashBoard.TotalSale = totalSale;
                dashBoard.TotalSaleByDay = totalSaleByDay;
                dashBoard.TotalEnrollment = totalEnrollment;
                dashBoard.TotalEnrollmentByDay = totalEnrollmentByDay;
                dashBoard.TotalStudent  = totalStudents;
                dashBoard.TotalStuentByDay = totalStudentsByDay;
                dashBoard.TotalSubscriber = totalSubcribers;
                dashBoard.TotalSubscriberByDay = totalSubcribersByDay;

                return dashBoard;
            }
            catch(Exception ex)
            {
                return Result<Dashboard>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<SaleOfYear>> GetSaleOfYear(Guid id)
        {
            try
            {
                var listOrder = await _instructorRepository.GetInstructorByIdAsync<OrderDetail>(id)
                                                                .Include(x => x.Course)
                                                                .Where(c => c.Course.UserId.Equals(id))
                                                                .ToListAsync();

                var saleOfYear = new List<SaleOfYear>();
                foreach (OrderDetail item in listOrder)
                {
                    var itemSale = new SaleOfYear();
                    itemSale.month = item.PurchasedDay.Month.ToString();
                    itemSale.sale = item.Price;
                    saleOfYear.Add(itemSale);

                }
                return saleOfYear;
                
            }
            catch (Exception ex)
            {
                return Result<List<SaleOfYear>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<SaleOfYear>> InstructorEarning()
        {
            try
            {
                var listOrder = _orderDetailRepository.ListAsync<OrderDetail>().ToList();

                var saleOfYear = new List<SaleOfYear>();
                foreach (OrderDetail item in listOrder)
                {
                    var itemSale = new SaleOfYear();
                    itemSale.month = item.PurchasedDay.Month.ToString();
                    itemSale.sale = item.Price;
                    saleOfYear.Add(itemSale);

                }
                return saleOfYear;

            }
            catch (Exception ex)
            {
                return Result<List<SaleOfYear>>.Error(new[] { ex.Message });
            }
        }
    }
}

