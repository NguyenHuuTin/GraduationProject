using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IQuizzService
    {
        Task<QuizzAnswer> GetQuizzAnswer(Guid questionId);


        Task<List<UserQuizzAnswer>> GetAllQuizzAnswer(Guid userId);

        Task<bool> AddQuizzComplete(Guid userId, Guid quizzId);

        Task<bool> AddUserAnswer(Guid userId, Guid quizzAnswerId);

        Task<CourseCompletion> AddCourseComplete(Guid userId, Guid courseId);

        Task<bool> CheckCompleteQuizz(Guid userId, Guid quizzId);

        Task<bool> DeleteUserQuizzAnswer(Guid userId);
    }
}
