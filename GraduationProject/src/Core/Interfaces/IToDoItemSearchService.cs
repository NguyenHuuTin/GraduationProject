using Ardalis.Result; 
using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IToDoItemSearchService
    {
        Task<Result<ToDoItem>> GetNextIncompleteItemAsync();
        Task<Result<List<ToDoItem>>> GetAllIncompleteItemsAsync(string searchString);
    }
}
