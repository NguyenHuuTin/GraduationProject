using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using WebAPI.Endpoints.CategoryItems;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints
{
    public class DeleteCategory : BaseAsyncEndpoint
    {
        private readonly ICategoryService _categoryService;

        public DeleteCategory(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpDelete("/DeleteCategory/{id}")]
        [SwaggerOperation(
            Summary = "Delete a category",
            Description = "Delete a category with a longer description",
            OperationId = "Category.Delete",
            Tags = new[] { "CategoryEndpoints" })
        ]
        public async Task<ActionResult<CategoryResponse>> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var existingItem =  await _categoryService.GetCategoryById(id);
            if (existingItem == null) return BadRequest();
            else
            {
                existingItem.IsDeleted = true;
            }
            await _categoryService.UpdateCategory(existingItem);

            return Ok(existingItem);
        }

    }
}
