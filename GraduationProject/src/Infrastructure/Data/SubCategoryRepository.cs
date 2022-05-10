using Core.Specifications;
using SharedKernel;
using SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SubCategoryRepository : EfRepository,ISubCategoryRepository
    {
        private readonly AppDbContext _dbContext;

        public SubCategoryRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

    }
}
