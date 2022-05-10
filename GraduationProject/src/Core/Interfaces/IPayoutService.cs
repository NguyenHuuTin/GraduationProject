using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IPayoutService
    {
        Task<List<Payout>> GetAllPayout();

        Task<Payout> GetById(Guid id);

        Task<List<Payout>> GetByInstructor(Guid id);

        Task<bool> UpdatePayout(Payout payout);

        Task<bool> InsertPayout(Payout payout);

        Task<List<Payout>> SearchPayout(string input);
    }
}
