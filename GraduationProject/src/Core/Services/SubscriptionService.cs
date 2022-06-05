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
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _repository;

        public SubscriptionService(ISubscriptionRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Subscription>> GetAllSubscription()
        {
            var incompleteSpec = new GetAllSubscription();
            try
            {
                return await _repository.ListAsync<Subscription>(incompleteSpec);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Subscription>>.Error(new[] { ex.Message });
            }
        }
    }
}
