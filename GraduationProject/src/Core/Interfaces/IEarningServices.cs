using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IEarningServices
    {
        Task<List<OrderDetail>> GetAllEarningAsync(Guid id);

        Task<List<OrderDetail>> GetEarningAsync(Guid id);

        Task<OrderDetail> GetByIdAsync(Guid id);
    }
}
