using SharedKernel.Interfaces;
using System;
using System.Collections.Generic;
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

        public async Task<T> AddCourseCompletionAsync<T>(T entity) where T : class
        {
            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;

        }
    }
}
