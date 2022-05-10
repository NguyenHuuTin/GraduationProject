using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Languages
{
    public class GetById : BaseAsyncEndpoint<Guid, Language>
    {
        private readonly ILanguageService _service;

        public GetById(ILanguageService service)
        {
            _service = service;
        }

        [HttpGet("/Languages/{id}")]
        [SwaggerOperation(
            Summary = "Gets a single Language",
            Description = "Gets a single Language by Id",
            OperationId = "Language.GetById",
            Tags = new[] { "LanguageEndpoints" })
        ]
        public override async Task<ActionResult<Language>> HandleAsync(Guid id, CancellationToken cancellationToken)
        {
            var item = await _service.GetLanguageByID(id);

            return Ok(item);
        }
    }
}
