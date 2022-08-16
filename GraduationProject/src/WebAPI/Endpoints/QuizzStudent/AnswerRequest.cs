using System;

namespace WebAPI.Endpoints.QuizzStudent
{
    public class AddAnswerRequest
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
