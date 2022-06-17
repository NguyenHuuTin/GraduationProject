namespace WebAPI.Endpoints.Dashboard
{
    public class DashboardResponse
    {
        public decimal TotalSale { get; set; }
        public decimal TotalSaleByDay { get; set; }
        public int TotalCourse { get; set; }
        public int TotalCourseByDay { get; set; }
        public int TotalEnrollment { get; set; }
        public int TotalEnrollmentByDay { get; set; }
        public int TotalStudent { get; set; }
        public int TotalStuentByDay { get; set; }
        public int TotalSubscriber { get; set; }
        public int TotalSubscriberByDay { get; set; }
    }

    public class SaleResponse
    {
        public int month { get; set; }
        public decimal sale { get; set; }
        public string monthString { get; set; }
    }
}
