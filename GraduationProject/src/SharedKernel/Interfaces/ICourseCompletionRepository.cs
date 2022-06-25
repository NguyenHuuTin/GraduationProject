using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SharedKernel.Interfaces
{
    public interface ICourseCompletionRepository: IRepository
    {
        Task<T> AddQuizzAsync<T>(T entity) where T : class;

        Task<List<T>> GetQuizzComplete<T>(ISpecification<T> spec) where T : class;

        Task DeleteQuizzListAsync<T>(Expression<Func<T, bool>> expression) where T : class;

    }
}
