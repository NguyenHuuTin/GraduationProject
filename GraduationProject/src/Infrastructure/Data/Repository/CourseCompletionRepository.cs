using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SharedKernel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public class CourseCompletionRepository : EfRepository, ICourseCompletionRepository
    {
        private readonly AppDbContext _dbContext;

        public CourseCompletionRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<T> AddQuizzAsync<T>(T entity) where T : class
        {
            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;

        }

        public async Task<List<T>> GetQuizzComplete<T>(ISpecification<T> spec) where T : class
        {
            var specificationResult = ApplySpecification(spec);
            return await specificationResult.ToListAsync();
        }

        private IQueryable<T> ApplySpecification<T>(ISpecification<T> spec) where T : class
        {
            var evaluator = new SpecificationEvaluator<T>();
            return evaluator.GetQuery(_dbContext.Set<T>().AsQueryable(), spec);
        }

        public async Task DeleteQuizzListAsync<T>(Expression<Func<T, bool>> expression) where T : class
        {
            _dbContext.Set<T>().RemoveRange(_dbContext.Set<T>().Where(expression));

            await _dbContext.SaveChangesAsync();
        }
    }
}
