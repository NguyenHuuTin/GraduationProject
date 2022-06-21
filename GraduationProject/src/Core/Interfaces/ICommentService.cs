using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICommentService
    {
        Task<List<QuestionAndAnswer>> GetListComment(Guid id);

        Task<bool> AddComment(QuestionAndAnswer questionAndAnswer);
    }
}
