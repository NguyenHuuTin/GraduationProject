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

        public async Task<List<Comment>> GetListComment()
        {
            var incompleteSpec = new GetAllComment();
            try
            {
                return await _repository.ListAsync<Comment>(incompleteSpec);

            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Comment>>.Error(new[] { ex.Message });
            }
        }
    }
}
