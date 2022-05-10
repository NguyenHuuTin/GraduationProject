using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using WebAPI.Endpoints.SubCategories.UpdateSubCategory;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints
{
    public class UpdateSubCategory : BaseAsyncEndpoint<UpdateToSubCategoryRequest, SubCategoryResponse>
    {
        private readonly ISubCategoryService _subCategoryService;

        public UpdateSubCategory(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpPut("/updatesubcategory")]
        [SwaggerOperation(
            Summary = "Updates a subcategory",
            Description = "Updates a subcategory with a longer description",
            OperationId = "SubCategory.Update",
            Tags = new[] { "SubCategoryEndpoints" })
        ]
        public override async Task<ActionResult<SubCategoryResponse>> HandleAsync(UpdateToSubCategoryRequest request, CancellationToken cancellationToken)
        {
            var existingItem =  await _subCategoryService.GetSubCategoryById(request.Id);
            if (existingItem == null) return BadRequest();
            else
            {
                existingItem.Name = request.Name;
                existingItem.CategoryId = request.CategoryId;
                existingItem.Status = request.Status;
                existingItem.UpdateAt = DateTime.Now;
            }
            await _subCategoryService.UpdateSubCategory(existingItem);
            return Ok(existingItem);
        }

    }
}
