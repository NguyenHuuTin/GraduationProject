using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using WebAPI.Endpoints.SubCategories;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints
{
    public class DeleteSubCategory : BaseAsyncEndpoint
    {
        private readonly ISubCategoryService _subCategoryService;

        public DeleteSubCategory(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpDelete("/DeleteSubCategory/{id}")]
        [SwaggerOperation(
            Summary = "Delete a subcategory",
            Description = "Delete a subcategory with a longer description",
            OperationId = "SubCategory.Delete",
            Tags = new[] { "SubCategoryEndpoints" })
        ]
        public async Task<ActionResult<SubCategoryResponse>> DeleteSubCate(Guid id, CancellationToken cancellationToken)
        {
            var existingItem =  await _subCategoryService.GetSubCategoryById(id);
            if (existingItem == null) return BadRequest();
            else
            {
                existingItem.IsDeleted = true;
            }

            await _subCategoryService.UpdateSubCategory(existingItem);

            return Ok(existingItem);
        }

    }
}
