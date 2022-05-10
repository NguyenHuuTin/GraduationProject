using Ardalis.Result;
using Core.Entities;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategory();
        Task<Category> GetCategoryById(Guid id);
        Task<Category> CreateCategory(Category category);
        Task<Category> DeleteCategory(Category category);
        Task<Category> UpdateCategory(Category category);
        Task<Category> GetNextIncompleteItemAsync();
        Task<List<Category>> GetAllIncompleteItemsAsync(string searchString);
        Task<bool> IsCategoryNameExisted(string catename);
    }
}
