using Ardalis.Result;
using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Core.Interfaces;
using SharedKernel;
using SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public class DashboardRepository : EfRepository, IDashboardRepository
    {
        private readonly AppDbContext _dbContext;

        public DashboardRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
        /* public async Task<List<T>> ListOrderDetailOfInstructor<T>(ISpecification<T> spec) where T : class
         {
             var specificationResult = GetTotalSalesByDaySpecification(spec);
             return await specificationResult.Sum();
         }*/
        public IQueryable<T> GetQuery<T>(Guid id) where T : class
        {
            return _dbContext.Set<T>();
        }

    }
}
