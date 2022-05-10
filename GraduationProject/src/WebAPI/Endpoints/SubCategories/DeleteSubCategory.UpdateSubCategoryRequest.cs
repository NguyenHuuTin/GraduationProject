using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.SubCategories
{
    public class UpdateSubCategoryRequest
    {
        public Guid Id { get; set; }
        public bool IsDelete { get; set; }
    }
}
