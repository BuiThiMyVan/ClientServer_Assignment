using System.Web.Mvc;

namespace VEGETFOODS.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "SignOut",
                "dang-xuat",
                new { action = "Logout", controller = "Account", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "Register",
                "dang-ky",
                new { action = "Register", controller = "Account", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "Login",
                "dang-nhap",
                new { action = "Login", controller = "Account", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Dashboard", controller = "Home", id = UrlParameter.Optional }
            );
        }
    }
}