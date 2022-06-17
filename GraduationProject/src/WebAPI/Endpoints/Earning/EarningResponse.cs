using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Earning
{
    public class EarningResponse
    {
        public decimal SalesEarnings { get; set; }

        public decimal YourEarning { get; set; }

        public decimal AdminCommission { get; set; }
    }
}
