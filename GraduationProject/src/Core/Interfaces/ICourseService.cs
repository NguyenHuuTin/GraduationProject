using System;
using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Class;

namespace Core.Interfaces
{
    public interface ICourseService
    {
        Task<Course> GetDetailCourse(Guid id);
        Task<bool> RejectedCourse(Guid id);
        Task<bool> BlockedCourse(Guid id);
        Task<bool> GiveForReview(Guid id);
        Task<bool> DraftCourse(Guid id);
        Task<bool> ApprovedCourse(Guid id);
        Task<bool> BestSeller(Guid id);
        Task<bool> Feature(Guid id);
        Task<Course> CreateCourse(Course course);
        Task<Course> CreateCourseWithImg(CourseMain course, Guid id);
        Task<decimal> GetDiscount(Guid promotionId);
        Task<bool> CheckCourseOfUser(Guid courseId, Guid userId);
        Task<bool> UpdateView(Guid courseId, IFormFile image, IFormFile trailer);
        Task<List<Course>> GetAllCourse<Course>();
        Task<List<Course>> GetCourseByUser<Course>(Guid Id);
        Task<List<Course>> GetDraftCourse<Course>(Guid id);
        Task<List<Course>> GetUpcomingCourse<Course>(Guid id);
        Task<List<Course>> GetApproveCourse<Course>();
        Task<List<Course>> GetRejectedCourse<Course>();
        Task<List<Course>> GetBlockCourse<Course>();
        Task<List<Course>> GetActiveCourse<Course>();
        Task<List<Course>> GetActiveCourseStudent<Course>();
        Task UpdateCourse(Course request, IFormFile image, IFormFile trailer);
        Task UpdateSection(Section request);
        Task<bool> UpdateLesson(LessonContent request);
        Task<bool> CreateCourseContent(CourseContent courseContent);
        Task<Guid> CreateCourseSection(Section section);
        Task<bool> DeleteSection(Guid sectionId);
        Task<bool> DeleteLeture(Guid Id);
        Task<bool> DeleteCourse(Guid Id);
        Task<bool> DeleteQuestion(Guid Id);
        Task<bool> DeleteQuizz(Guid Id);
        Task<Guid> GetUserIdBySectionId(Guid sectionId);
        Task<Guid> GetUserIdByCourseId(Guid Id);
        Task<bool> UpdateExtra(Guid courseId, string status);
        Course GetCourseCreating(Guid userId);
        Task<bool> AddLesson(LessonContent lessonContent);

        Task<List<OrderDetail>> GetTopCourse(Guid id);

        Task<Section> GetSection(Guid id);

        Quizz GetQuizz(Guid SectionId);

        Task<bool> AddQuizz(Quizz quizz);

        Task<Guid> AddQuestion(QuizzQuestion quizz);

        Task<Guid> AddAnswer(QuizzAnswer quizz);

        Task<Quizz> GetQuizzById(Guid Id);

        Task<QuizzQuestion> GetQuestionById(Guid Id);

        Task<QuizzAnswer> GetAnswerById(Guid Id);

        Task<bool> UpdateQuizz (Quizz quizz);

        Task<bool> UpdateQuestion (QuizzQuestion quizz);

        Task<bool> UpdateAnswer (QuizzAnswer quizz);
    }
}
