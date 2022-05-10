using Ardalis.Result;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICourseCompletionService
    {
        Task<Result<bool>> CreateCourseCompletion(Guid userId, Guid courseId);
    }
}
