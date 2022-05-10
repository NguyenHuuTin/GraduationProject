using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class CourseRatingConfiguration : IEntityTypeConfiguration<CourseRating>
    {
        public void Configure(EntityTypeBuilder<CourseRating> builder)
        {
            builder.ToTable("CourseRating");
            builder.HasKey(s => s.Id);
            builder.HasOne<Enrollment>(s => s.Enrollment)
               .WithMany(g => g.CourseRatings)
               .HasForeignKey(x => x.EnrollmentId);
        }
    }
}
