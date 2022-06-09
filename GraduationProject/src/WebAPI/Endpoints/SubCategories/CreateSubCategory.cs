﻿using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.SubCategories
{
    public class CreateSubCategory : BaseAsyncEndpoint<NewSubCategory, SubCategoryResponse>
    {
        private readonly ISubCategoryService _subCategoryService;

        public CreateSubCategory(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpPost("/AddSubCategory")]
        [SwaggerOperation(
            Summary = "Creates a new subcategory",
            Description = "Creates a new subcategory",
            OperationId = "SubCategory.Create",
            Tags = new[] { "SubCategoryEndpoints" })
        ]
        public override async Task<ActionResult<SubCategoryResponse>> HandleAsync([FromBody]NewSubCategory request, CancellationToken cancellationToken)
        {
            //Check value Name already exists in the data
            var checkName = await _subCategoryService.IsSubCategoryNameExisted(request.Name);
            if(checkName == true)
            {
                return Ok("Name already exists in the data!");
            }    
            var item = new SubCategory
            {
                Name = request.Name,
                Status = request.Status,
                CategoryId = request.CategoryId,
                CreateAt =  DateTime.Now
            };
            var createdItem = await _subCategoryService.CreateSubCategory(item);

            return Ok(createdItem);
        }
    }
}
