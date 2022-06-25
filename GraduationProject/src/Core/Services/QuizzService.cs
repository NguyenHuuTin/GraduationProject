using Ardalis.Result;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using SharedKernel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class QuizzService : IQuizzService
    {
        private readonly IRepository _repository;
        private readonly ICourseCompletionRepository _courseCompletionRepository;

        public QuizzService(IRepository repository, ICourseCompletionRepository courseCompletionRepository)
        {
            _repository = repository;
            _courseCompletionRepository = courseCompletionRepository;
        }

        public async Task<CourseCompletion> AddCourseComplete(Guid userId, Guid courseId)
        {
            try
            {
                CourseCompletion item = new CourseCompletion();
                item.UserId = userId;
                item.CourseId = courseId;
                item.CompleteDate = DateTime.Now;
                return await _courseCompletionRepository.AddQuizzAsync<CourseCompletion>(item);
                 
            }
            catch(Exception ex)
            {
                return Result<CourseCompletion>.Error(new[] { ex.Message });
            }
        }

        public async Task<bool> AddQuizzComplete(Guid userId, Guid quizzId)
        {
            try
            {
                QuizzCompletion item = new QuizzCompletion();
                item.UserId = userId;
                item.QuizzId = quizzId;
                item.CompleteDate = DateTime.Now;
                await _courseCompletionRepository.AddQuizzAsync<QuizzCompletion>(item);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> AddUserAnswer(Guid userId, Guid quizzAnswerId)
        {
            try
            {
                UserQuizzAnswer item = new UserQuizzAnswer();
                item.UserId = userId;
                item.QuizzAnswerId = quizzAnswerId;
                item.CreateAt = DateTime.Now;
                await _courseCompletionRepository.AddQuizzAsync<UserQuizzAnswer>(item);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CheckCompleteQuizz(Guid userId, Guid quizzId)
        {
            var incompleteSpec = new GetQuizzComplete(userId, quizzId);
            var items = await _courseCompletionRepository.GetQuizzComplete<QuizzCompletion>(incompleteSpec);
            if (items.Count() != 0)
            {
                return true;
            }
            else return false;
        }

        public async Task<bool> DeleteUserQuizzAnswer(Guid userId)
        {
            await _courseCompletionRepository.DeleteQuizzListAsync<UserQuizzAnswer>(x => x.UserId == userId);
            return true;
        }

        public async Task<List<UserQuizzAnswer>> GetAllQuizzAnswer(Guid userId)
        {
            var incompleteSpec = new GetAllDetailAnswerByID(userId);

            try
            {
                var items = await _courseCompletionRepository.GetQuizzComplete<UserQuizzAnswer>(incompleteSpec);
                return items;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<UserQuizzAnswer>>.Error(new[] { ex.Message });
            }
        }

        public async Task<QuizzAnswer> GetQuizzAnswer(Guid questionId)
        {
            var incompleteSpec = new GetDetailAnswerByID(questionId);

            try
            {
                var items = await _repository.ListAsync<QuizzAnswer>(incompleteSpec);

                return items.First();
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<QuizzAnswer>.Error(new[] { ex.Message });
            }
        }

    }
}
