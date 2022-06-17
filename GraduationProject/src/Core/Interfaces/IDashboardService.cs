using Ardalis.Result;
using Class;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IDashboardService
    {
        Task<decimal> GetTotalSalesByDay(Guid id);
        Task<int> GetTotalCoursesByDay(Guid id);
        Task<int> GetTotalEnrollmentsByDay(Guid id);
        Task<int> GetTotalStudentsByDay(Guid id);
        Task<int> GetTotalSubcribersByDay(Guid id);
        Task<int> GetTotalViewsByDay(Guid id);

        Task<Dashboard> GetTotal(Guid id);

        Task<List<SaleOfYear>> GetSaleOfYear(Guid id);
        Task<List<SaleOfYear>> InstructorEarning();
    }
}
