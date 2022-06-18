using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data.Config
{
    public class ComentConfiguration : IEntityTypeConfiguration<Comment>
    {

        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Coment");
            builder.HasKey(s => s.Id);
            builder.Property(s => s.UserId)
                .IsRequired();
            builder.Property(s => s.CourseId)
                .IsRequired();
            builder.HasOne<User>(s => s.User)
              .WithMany(g => g.Comments)
              .HasForeignKey(x => x.UserId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Course>(s => s.Course)
             .WithMany(g => g.Comments)
             .HasForeignKey(x => x.CourseId)
             .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
