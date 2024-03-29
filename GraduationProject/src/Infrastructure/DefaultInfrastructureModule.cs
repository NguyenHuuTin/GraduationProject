﻿using Autofac;
using Core;
using Core.Interfaces;
using Core.Services;
using Infrastructure.Data;
using Infrastructure.Data.Repository;
using SharedKernel.Interfaces;
using MediatR;
using MediatR.Pipeline;
using System.Collections.Generic;
using System.Reflection;
using Module = Autofac.Module;

namespace Infrastructure
{
    public class DefaultInfrastructureModule : Module
    {
        private bool _isDevelopment = false;
        private readonly List<Assembly> _assemblies = new List<Assembly>();

        public DefaultInfrastructureModule(bool isDevelopment, Assembly callingAssembly =  null)
        {
            _isDevelopment = isDevelopment;
            var coreAssembly = Assembly.GetAssembly(typeof(DatabasePopulator));
            var infrastructureAssembly = Assembly.GetAssembly(typeof(EfRepository));
            _assemblies.Add(coreAssembly);
            _assemblies.Add(infrastructureAssembly);
            if (callingAssembly != null)
            {
                _assemblies.Add(callingAssembly);
            }
        }

        protected override void Load(ContainerBuilder builder)
        {
            if (_isDevelopment)
            {
                RegisterDevelopmentOnlyDependencies(builder);
            }
            else
            {
                RegisterProductionOnlyDependencies(builder);
            }
            RegisterCommonDependencies(builder);
        }

        private void RegisterCommonDependencies(ContainerBuilder builder)
        {
            builder.RegisterType<EfRepository>().As<IRepository>()
                .InstancePerLifetimeScope();
            builder.RegisterType<UserRepository>().As<IUserRepository>()
               .InstancePerLifetimeScope();
            builder.RegisterType<RoleRepository>().As<IRoleRepository>()
                .InstancePerLifetimeScope();
            builder.RegisterType<UserServices>().As<IUserServices>()
                .InstancePerLifetimeScope();
            builder.RegisterType<OrderDetailService>().As<IOrderDetailService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<SubscriptionService>().As<ISubscriptionService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<StudentRepository>().As<IStudentReponsitory>().InstancePerLifetimeScope();
            builder.RegisterType<CategoryRepository>().As<ICategoryRepository>()
            .InstancePerLifetimeScope();
            builder.RegisterType<SubCategoryRepository>().As<ISubCategoryRepository>()
               .InstancePerLifetimeScope();
            builder.RegisterType<IntructorRepository>().As<IInstructorRepository>()
                .InstancePerLifetimeScope();
            builder.RegisterType<OrderDetailRepository>().As<IOrderDetailRepository>()
                .InstancePerLifetimeScope();
            builder.RegisterType<SubscriptionRepository>().As<ISubscriptionRepository>()
                .InstancePerLifetimeScope();
            builder.RegisterType<DashboardRepository>().As<IDashboardRepository>()
                .InstancePerLifetimeScope();
            builder.RegisterType<CourseCompletionRepository>().As<ICourseCompletionRepository>()
               .InstancePerLifetimeScope();


            builder
                .RegisterType<Mediator>()
                .As<IMediator>()
                .InstancePerLifetimeScope();

            builder.Register<ServiceFactory>(context =>
            {
                var c = context.Resolve<IComponentContext>();
                return t => c.Resolve(t);
            });

            var mediatrOpenTypes = new[]
            {
                typeof(IRequestHandler<,>),
                typeof(IRequestExceptionHandler<,,>),
                typeof(IRequestExceptionAction<,>),
                typeof(INotificationHandler<>),
            };

            foreach (var mediatrOpenType in mediatrOpenTypes)
            {
                builder
                .RegisterAssemblyTypes(_assemblies.ToArray())
                .AsClosedTypesOf(mediatrOpenType)
                .AsImplementedInterfaces();
            }

            builder.RegisterType<EmailSender>().As<IEmailSender>()
                .InstancePerLifetimeScope();


            builder.RegisterType<FeedBackSearchService>().As<IFeedBackSearchService>()
             .InstancePerLifetimeScope();
            builder.RegisterType<CategoryService>().As<ICategoryService>()
             .InstancePerLifetimeScope();

            builder.RegisterType<CommentService>().As<ICommentService>()
             .InstancePerLifetimeScope();

            builder.RegisterType<CourseService>().As<ICourseService>()
                .InstancePerLifetimeScope();
                
            //declare interface and service 
            builder.RegisterType<LanguageService>().As<ILanguageService>();
            builder.RegisterType<RoleService>().As<IRoleService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<FeedBackService>().As<IFeedBackService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<FeedBackSearchService>().As<IFeedBackSearchService>();
            builder.RegisterType<RoleService>().As<IRoleService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<RoleRepository>().As<IRoleRepository>();
            builder.RegisterType<FeedBackSearchService>().As<IFeedBackSearchService>();

            builder.RegisterType<StudentService>().As<IStudentService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<SubCategoryService>().As<ISubCategoryService>()
               .InstancePerLifetimeScope();

            builder.RegisterType<PayoutService>().As<IPayoutService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<QuizzService>().As<IQuizzService>()
                 .InstancePerLifetimeScope();
            builder.RegisterType<ReviewService>().As<IReviewService>()
               .InstancePerLifetimeScope();

            builder.RegisterType<NotificationService>().As<INotificationService>()
                .InstancePerLifetimeScope();
            builder.RegisterType<StatementService>().As<IStatementService>()
               .InstancePerLifetimeScope();
            builder.RegisterType<EarningServices>().As<IEarningServices>()
                .InstancePerLifetimeScope();
            builder.RegisterType<InstructorService>().As<IInstructorService>()
               .InstancePerLifetimeScope();
            builder.RegisterType<DashboardService>().As<IDashboardService>()
              .InstancePerLifetimeScope();
            builder.RegisterType<CourseCompletionService>().As<ICourseCompletionService>()
             .InstancePerLifetimeScope();


        }

        private void RegisterDevelopmentOnlyDependencies(ContainerBuilder builder)
        {
            // TODO: Add development only services
        }

        private void RegisterProductionOnlyDependencies(ContainerBuilder builder)
        {
            // TODO: Add production only services
        }

    }
}
