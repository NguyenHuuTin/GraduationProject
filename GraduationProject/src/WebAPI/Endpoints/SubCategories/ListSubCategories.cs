using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.SubCategories
{
    public class ListSubCategories : BaseAsyncEndpoint<List<SubCategoryResponse>>
    { 
        private readonly ISubCategoryService _subCategoryService;

        public ListSubCategories(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpGet("/subcategory")]
        [SwaggerOperation(
         Summary = "Gets a list of all SubCategory",
         Description = "Gets a list of all SubCategory",
         OperationId = "SubCategory.List",
         Tags = new[] { "SubCategoryEndpoints" })
        ]
        public override async Task<ActionResult<List<SubCategoryResponse>>> HandleAsync(CancellationToken cancellationToken)
        {
            var items = (await _subCategoryService.GetAllSubCategory())
               .Select(item => new SubCategoryResponse
               {
                   Id = item.Id,
                   CategoryId = item.CategoryId,
                   CategoryName = item.Category.Name,
                   Name = item.Name,
                   Status = item.Status
               });

            return Ok(items);
        }
    }
}
