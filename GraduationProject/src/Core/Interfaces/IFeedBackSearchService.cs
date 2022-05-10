using Ardalis.Result;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IFeedBackSearchService
    {
        /// <summary>
        /// Search feed back
        /// </summary>
        /// <param name="input"></param>
        /// <returns>list feed back</returns>
        Task<List<Feedback>> SearchFeedBack(string input);
    }
}
