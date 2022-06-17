using Ardalis.Result;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Class;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Services
{
    public class CourseService : ICourseService
    {
        private readonly IRepository _repository;
        private readonly IInstructorRepository _instructorRepository;
        private readonly Cloudinary _cloudinary;

        public CourseService(IRepository repository, Cloudinary cloudinary, IInstructorRepository instructorRepository)
        {
            _repository = repository;
            _cloudinary = cloudinary;
            _instructorRepository = instructorRepository;
        }

        public async Task<Course> GetDetailCourse(Guid id)
        {
            var incompleteSpec = new GetDetailCourse(id);

            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return items.First();
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<Course>.Error(new[] { ex.Message });
            }
        }
        
        public async Task<List<Course>> GetAllCourse<Course>()
        {
            var incompleteSpec = new GetAllItem();
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetApproveCourse<Course>()
        {
            var incompleteSpec = new GetApproveItem();
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetRejectedCourse<Course>()
        {
            var incompleteSpec = new GetRejectedItem();
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetBlockCourse<Course>()
        {
            var incompleteSpec = new GetBlockItem();
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetActiveCourse<Course>()
        {
            var incompleteSpec = new GetActiveItem();
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }


        public async Task<List<Course>> GetActiveCourseStudent<Course>()
        {
            var incompleteSpec = new GetActiveItemStudent();
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        /// <summary>
        /// Update Course's Status to Waiting for approval
        /// </summary>
        /// <returns>Value of updated result</returns>
        public async Task<bool> RejectedCourse(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(id);

                //Updated Course's Status
                course.IsRejected = true;
                course.Status = "Reject";

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }
        
        /// <summary>
        /// Update Course's Feature
        /// </summary>
        /// <returns>Value of updated result</returns>
        public async Task<bool> Feature(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(id);

                //Check status must be "Active"
                if (course.Status.Trim().ToLower().Equals("active"))
                    return false;

                //Updated Course's feature
                course.IsFeatured = !course.IsFeatured;

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }
        
        /// <summary>
        /// Update Course's IsBestSeller to true or false
        /// </summary>
        /// <returns>Value of updated result</returns>
        public async Task<bool> BestSeller(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(id);

                //Check status must be "Active"
                if (course.Status.Trim().ToLower().Equals("active"))
                    return false;

                //Updated Course's IsBestSeller
                course.IsBestSeller = !course.IsBestSeller;

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }
        
        /// <summary>
        /// Update Course's Status to Blocked or last status
        /// </summary>
        /// <returns>Value of updated result</returns>
        public async Task<bool> BlockedCourse(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(id);

                course.IsBlocked = true;

                course.Status = "Block";

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }
        
        /// <summary>
        /// Update Course's Status to Active
        /// </summary>
        /// <returns>Value of updated result</returns>
        public async Task<bool> ApprovedCourse(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await  _repository.GetByIdAsync<Course>(id);

                //Check status must be "Waiting for approved"
                /*if (course.Status.Trim().ToLower().Equals("waiting for approved"))
                    return false;*/

                //Updated Course's Status
                course.IsBlocked = false;
                course.Status = "Active";

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }

        /// <summary>
        /// Create new course
        /// </summary>
        /// <returns>Course just created</returns>
        public async Task<Course> CreateCourse(Course course)
        {
            course.CreateAt = DateTime.Now;
            course.UpdateAt = DateTime.Now;
            course.Status = "Draft";

            return await _repository.AddAsync<Course>(course);
        }

        public async Task<Course> CreateCourseWithImg(CourseMain request, Guid id)
        {
            var item = new Course
            {
                UserId =id,
                Title = request.Title,
                Description = request.Description,
                LanguageId = request.LanguageId,
                SubCategoryId = request.SubCategoryId,
                ImageUrl = await UploadImage(request.BackgroupCourse),
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now,
                Status = "Draft",
                OriginPrice = request.Price

        };

            return await _repository.AddAsync<Course>(item);
        }

        /// <summary>
        /// Get discount of promotion
        /// </summary>
        /// <param name="promotionId">Id of promotion</param>
        /// <returns>Value of discount</returns>
        public async Task<decimal> GetDiscount(Guid promotionId)
        {
            Promotion promotion = await _repository.GetByIdAsync<Promotion>(promotionId);

            return promotion.DiscountPercent;
        }

        /// <summary>
        /// Check course must be owned user
        /// </summary>
        /// <param name="courseId">course Id</param>
        /// <param name="userId">user Id</param>
        /// <returns>true if it's already exits</returns>
        public async Task<bool> CheckCourseOfUser(Guid courseId, Guid userId)
        {
            Course course = await _repository.GetByIdAsync<Course>(courseId);

            if (course?.UserId == userId)
                return true;
            else
                return false;
        }

        /// <summary>
        /// Upload to Cloudinary for image and trailer video
        /// </summary>
        /// <param name="courseId">course id</param>
        /// <param name="image">image file</param>
        /// <param name="trailer">image file</param>
        /// <returns>true if it's success</returns>
        public async Task<bool> UpdateView(Guid courseId, IFormFile image, IFormFile trailer)
        {
            //find Course by Id
            Course course = await _repository.GetByIdAsync<Course>(courseId);

            //set url for uploaded file
            course.ImageUrl = await UploadFile(image);
            course.TrailerUrl = await UploadFile(trailer);

            course.UpdateAt = DateTime.Now;

            //Update and SaveChange
            if (await _repository.UpdateAsync<Course>(course) == 1)
            {
                return true;
            }

            return false;
        }

        private async Task<string> UploadFile(IFormFile file)
        {
            //kiểm tra có ảnh hay không
            if (file != null)
            {
                #region Upload image to Cloudinary
                var results = new List<Dictionary<string, string>>();

                IFormatProvider provider = CultureInfo.CreateSpecificCulture("en-US");
                var result = await _cloudinary.UploadLargeAsync(new VideoUploadParams
                {
                    File = new FileDescription(file.FileName,
                        file.OpenReadStream()),
                    Tags = "backend_PhotoAlbum",
                    PublicId = "samples/Course/Video/" + file.FileName,
                    EagerTransforms = new List<Transformation>()
                      {
                        new EagerTransformation().Width(300).Height(300).Crop("pad").AudioCodec("none")
                      },
                        EagerAsync = true
                }).ConfigureAwait(false);

                //nếu upload thất bại
                if (result.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    return "";
                }

                var imageProperties = new Dictionary<string, string>();
                foreach (var token in result.JsonObj.Children())
                {
                    //tìm thuộc tính url để gán cho post
                    if (token is JProperty prop)
                    {
                        if (prop.Name.Equals("url"))
                            return prop.Value.ToString();
                    }
                }

                results.Add(imageProperties);
                #endregion
            }

            return "";
        }


        private async Task<string> UploadImage(IFormFile file)
        {
            //kiểm tra có ảnh hay không
            if (file != null)
            {
                #region Upload image to Cloudinary
                var results = new List<Dictionary<string, string>>();




                IFormatProvider provider = CultureInfo.CreateSpecificCulture("en-US");
                var result = await _cloudinary.UploadAsync(new ImageUploadParams
                {
                    File = new FileDescription(file.FileName,
                        file.OpenReadStream()),
                    Tags = "backend_PhotoAlbum",
                    PublicId = "samples/Course/image/" + file.FileName
                }).ConfigureAwait(false);


                //nếu upload thất bại
                if (result.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    return "";
                }

                var imageProperties = new Dictionary<string, string>();
                foreach (var token in result.JsonObj.Children())
                {
                    //tìm thuộc tính url để gán cho post
                    if (token is JProperty prop)
                    {
                        if (prop.Name.Equals("url"))
                            return prop.Value.ToString();
                    }
                }

                results.Add(imageProperties);
                #endregion
            }

            return "";
        }

        /// <summary>
        /// Create by:
        ///         Lesson table
        ///         Section table
        /// </summary>
        /// <returns>true if it's success</returns>
        public async Task<bool> CreateCourseContent(CourseContent courseContent)
        {
            Section section = new Section();

            //Set value of Section
            section.CourseId = courseContent.CourseId;
            section.Title = courseContent.CourseContentTitle;
            section.TotalTime = GetTotalTime(courseContent.LessonContents);
            //section.TotalTime = (int)courseContent.LessonContents.Duration;
            section.CreateAt = DateTime.Now;

            //Add new Section and Lesson
            return await AddListLesson((await _repository.AddAsync<Section>(section)).Id, courseContent.LessonContents);
        }


        public async Task<Guid> CreateCourseSection( Section section)
        {
            return (await _repository.AddAsync<Section>(section)).Id;

        }

        /// <summary>
        /// Get total time of total Lessons
        /// </summary>
        /// <param name="lessons"></param>
        /// <returns>value of Total time</returns>
        private int GetTotalTime(LessonContent[] lessons)
        {
            int result = 0;

            foreach (LessonContent lesson in lessons)
            {
                result += (int)lesson.Duration;
            }

            return result;
        }

        /// <summary>
        /// Insert element of Lesson list into database
        /// </summary>
        /// <param name="sectionId">Id of Section want relationship</param>
        /// <param name="lessonContents">Lesson list</param>
        /// <returns>true if it's success</returns>
        private async Task<bool> AddListLesson(Guid sectionId, LessonContent[] lessonContents)
        {
            try
            {
                foreach (LessonContent lessonContent in lessonContents)
                {
                    Lesson lesson = new Lesson();

                    //Set value for element in Lesson list
                    lesson.SectionId = sectionId;
                    lesson.Title = lessonContent.LessonTitle;
                    lesson.CreateAt = DateTime.Now;
                    lesson.VideoUrl = await UploadFile(lessonContent.File);
                    lesson.Duration = lessonContent.Duration;

                    await _repository.AddAsync<Lesson>(lesson);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }


        // add one lesson
        public async Task<bool> AddLesson(LessonContent lessonContent)
        {
            try
            {
                Lesson lesson = new Lesson();

                //Set value for element in Lesson list
                lesson.SectionId = lessonContent.SectionId;
                lesson.Title = lessonContent.LessonTitle;
                lesson.CreateAt = DateTime.Now;
                lesson.VideoUrl = await UploadFile(lessonContent.File);
                lesson.Duration = lessonContent.Duration;
                await _repository.AddAsync<Lesson>(lesson);
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Delete Section by id
        /// </summary>
        /// <param name="sectionId">section id</param>
        /// <returns>true if it's success</returns>
        public async Task<bool> DeleteSection(Guid sectionId)
        {
            try
            {
                await _repository.DeleteListAsync<Lesson>(item => item.SectionId == sectionId);

                await _repository.DeleteByIdAsync<Section>(sectionId);

                return true;
            }
            catch
            {
                return false;
            }
        }


        public async Task<bool> DeleteCourse(Guid Id)
        {
            var incompleteSpec = new GetSectionByCourseId(Id);
            try
            {
                var section = await _repository.ListAsync<Section>(incompleteSpec);
                foreach (var item in section)
                {
                    await _repository.DeleteListAsync<Lesson>(x => x.SectionId == item.Id);

                    await _repository.DeleteByIdAsync<Section>(item.Id);
                }
                await _repository.DeleteByIdAsync<Course>(Id);
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Get UserId by SectionId
        /// </summary>
        /// <param name="sectionId">section id</param>
        /// <returns>id of userId</returns>
        public async Task<Guid> GetUserIdBySectionId(Guid sectionId)
        {
            return (await _repository.Find<Section>(item => item.Id == sectionId)
                .Include(item => item.Course)
                .SingleOrDefaultAsync()).Course.UserId;
        }


        public async Task<Guid> GetUserIdByCourseId(Guid Id)
        {
            return (await _repository.Find<Course>(item => item.Id == Id)
                .SingleOrDefaultAsync()).UserId;
        }

        /// <summary>
        /// confirm create course or set as Draff
        /// </summary>
        /// <param name="courseId">Course Id</param>
        /// <returns>true if it's success</returns>
        public async Task<bool> UpdateExtra(Guid courseId, string status)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(courseId);
                
                //Set values
                course.UpdateAt = DateTime.Now;
                if (status.Trim().ToLower().Equals("draff"))
                    course.Status = "Draff";
                course.Status = "Waiting for approved";

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }

        /// <summary>
        /// Get Course creating
        /// </summary>
        /// <returns>Course</returns>
        public Course GetCourseCreating(Guid userId)
        {
            return  _repository
                .Find<Course>(item => item.Status.ToLower().Equals("no data"))
                .ToList().Where(item => item.UserId == userId)
                .ToList().Where(item => (DateTime.Now - item.CreateAt).Hours <= 1)
                .FirstOrDefault();
        }
        
        public async Task UpdateCourse(Course request, IFormFile image, IFormFile trailer)
        {
            try
            {
                var existingItem = await _repository.GetByIdAsync<Course>(request.Id);

                existingItem.Title = request.Title;
                existingItem.Description = request.Description;
                existingItem.ImageUrl = request.ImageUrl;
                existingItem.TrailerUrl = request.TrailerUrl;
                existingItem.Status = request.Status;
                existingItem.Subtitle = request.Subtitle;
                existingItem.OriginPrice = request.OriginPrice;
                existingItem.UpdateAt = DateTime.Now;
                existingItem.PromotionId = request.PromotionId;
                existingItem.SubCategoryId = request.SubCategoryId;
                existingItem.LanguageId = request.LanguageId;
                await UpdateView(request.Id, image, trailer);

                await _repository.UpdateAsync(existingItem);
            }
            catch (Exception ex)
            {
                Result<Course>.Error(new[] { ex.Message });
            }
        }

        public async Task UpdateSection(Section request)
        {
            try
            {
                var existingItem = await _repository.GetByIdAsync<Section>(request.Id);

                existingItem.Title = request.Title;
                existingItem.TotalTime = request.TotalTime;
                existingItem.UpdateAt = DateTime.Now;

                await _repository.UpdateAsync(existingItem);
            }
            catch (Exception ex)
            {
                Result<Section>.Error(new[] { ex.Message });
            }
        }

        public async Task UpdateLesson(Lesson request, IFormFile file)
        {
            try
            {
                var existingItem = await _repository.GetByIdAsync<Lesson>(request.Id);

                existingItem.Title = request.Title;
                existingItem.TotalTime = request.TotalTime;
                existingItem.UpdateAt = DateTime.Now;
                existingItem.Volume = request.Volume;
                existingItem.Duration = request.Duration;
                existingItem.VideoUrl = await UploadFile(file); ;

                await _repository.UpdateAsync(existingItem);
            }
            catch (Exception ex)
            {
                Result<Course>.Error(new[] { ex.Message });
            }
        }

        public async Task<bool> GiveForReview(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(id);

                //Check status must be "Waiting for approved"
                if (course.Status.Trim().ToLower() != "Draft".ToLower())
                    return false;

                //Updated Course's Status
                course.Status = "Waiting for approve";

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetCourseByUser<Course>(Guid Id)
        {
            var incompleteSpec = new GetCourseByUser(Id);
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetDraftCourse<Course>(Guid id)
        {
            var incompleteSpec = new GetDraftCourse(id);
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<Course>> GetUpcomingCourse<Course>(Guid id)
        {
            var incompleteSpec = new GetUpcomingCourse(id);
            try
            {
                var items = await _repository.ListAsync(incompleteSpec);

                return new List<Course>((IEnumerable<Course>)items);
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<List<Course>>.Error(new[] { ex.Message });
            }
        }
        
        public async Task<bool> DraftCourse(Guid id)
        {
            try
            {
                //find Course by Id
                Course course = await _repository.GetByIdAsync<Course>(id);

                //Check status must be "Waiting for approved"
                if (course.Status.Trim().ToLower() != "Waiting for approved".ToLower())
                    return false;

                //Updated Course's Status
                course.Status = "Draft";

                //Set updated date
                course.UpdateAt = DateTime.Now;

                //Update and SaveChange
                if (await _repository.UpdateAsync<Course>(course) == 1)
                {
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // TODO: Log details here
                return Result<bool>.Error(new[] { ex.Message });
            }
        }

        public async Task<List<OrderDetail>> GetTopCourse(Guid id)
        {
            var lstOrder = await _instructorRepository.GetInstructorByIdAsync<OrderDetail>(id)
                                                           .Include(c => c.Course)
                                                           .Where(c => c.Course.UserId.Equals(id))
                                                           .ToListAsync();
            return lstOrder;
        }
    }
}
