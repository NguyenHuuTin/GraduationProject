using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderDetailService
    {
        Task<List<OrderDetail>> GetAllOrderDetail();
        Task<List<OrderDetail>> GetAllOrderDetailWithStudent(Guid id);

        Task<bool> AddOrder(Guid userID, Guid courseId, decimal price);

    }
}
