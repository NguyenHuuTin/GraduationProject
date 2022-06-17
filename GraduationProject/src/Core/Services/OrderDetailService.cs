using Ardalis.Result;
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
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IOrderDetailRepository _repository;

        public OrderDetailService(IOrderDetailRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> AddOrder(Guid userID, Guid courseId, decimal price)
        {
            try
            {
                var item = new OrderDetail();
                item.CourseId = courseId;
                item.Price = price;
                item.UserId = userID;
                item.Type = "Sales";
                var result = await _repository.AddAsync<OrderDetail>(item);
                return true;
            }
            catch
            {
                return false;
            }
            
        }

        public async Task<List<OrderDetail>> GetAllOrderDetail()
        {
            var incompleteSpec = new GetOrderDetail();
            try
            {
                return await _repository.ListAsync<OrderDetail>(incompleteSpec);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<OrderDetail>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<OrderDetail>> GetAllOrderDetailWithStudent(Guid id)
        {
            var incompleteSpec = new GetOrderDetail(id);
            try
            {
                return await _repository.ListAsync<OrderDetail>(incompleteSpec);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<OrderDetail>>.Error(new[] { ex.Message });
            }
        }
    }
}

