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
    public class CommentService : ICommentService
    {
        private readonly IRepository _repository;

        public CommentService(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> AddComment(QuestionAndAnswer questionAndAnswer)
        {
            try
            {
               var result = await _repository.AddAsync<QuestionAndAnswer>(questionAndAnswer);
                if (result != null)
                {
                    return true;
                }
                else return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<QuestionAndAnswer>> GetListComment(Guid id)
        {
            var incompleteSpec = new GetAllComment(id);
            try
            {
                return await _repository.ListAsync<QuestionAndAnswer>(incompleteSpec);

            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<QuestionAndAnswer>>.Error(new[] { ex.Message });
            }
        }
    }
}
