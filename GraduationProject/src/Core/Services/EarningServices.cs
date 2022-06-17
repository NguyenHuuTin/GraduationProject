using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using SharedKernel.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class EarningServices: IEarningServices
    {
        private readonly IOrderDetailRepository _orderDetailRepository;

        public EarningServices(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }

        public async Task<List<OrderDetail>> GetAllEarningAsync(Guid id)
        {
            var incompleteSpec = new ListEarning(id);
            var item = await _orderDetailRepository.ListAsync(incompleteSpec);
            return item;
        }

        public Task<OrderDetail> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderDetail>> GetEarningAsync(Guid id)
        {
            var incompleteSpec = new GetEarning(id);
            var item = await _orderDetailRepository.ListAsync(incompleteSpec);
            return item;
        }
    }
}
