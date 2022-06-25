using System;

namespace WebAPI.Endpoints.QuizzStudent
{
    public class AnswerRequest
    {
        public Guid questionId { get; set; }

        public string answer { get; set; }
    }

    public class CompleteRequest
    {
        public Guid quizzId { get; set; }

        public int numQuizz { get; set; }
    }

}
