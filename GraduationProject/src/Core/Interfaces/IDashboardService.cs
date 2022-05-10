using Ardalis.Result;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IDashboardService
    {
        Task<Result<decimal>> GetTotalSalesByDay(Guid id);
        Task<Result<int>> GetTotalCoursesByDay(Guid id);
        Task<Result<int>> GetTotalEnrollmentsByDay(Guid id);
        Task<Result<int>> GetTotalStudentsByDay(Guid id);
        Task<Result<int>> GetTotalSubcribersByDay(Guid id);
        Task<Result<int>> GetTotalViewsByDay(Guid id);
    }
}
