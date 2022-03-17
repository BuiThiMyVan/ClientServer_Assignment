using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VEGETFOODS
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "SearchOrder",
               url: "tra-cuu-don-hang",
               defaults: new { controller = "Payment", action = "SearchOrder", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "Account",
               url: "tai-khoan",
               defaults: new { controller = "Account", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "Payment",
               url: "dat-hang",
               defaults: new { controller = "Payment", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "Cart",
               url: "gio-hang",
               defaults: new { controller = "Cart", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "Contact",
               url: "lien-he",
               defaults: new { controller = "Contact", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "AboutUs",
               url: "ve-chung-toi",
               defaults: new { controller = "AboutUs", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "News",
               url: "tin-tuc",
               defaults: new { controller = "News", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "Product",
               url: "san-pham",
               defaults: new { controller = "Product", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
               name: "Default1",
               url: "home-page",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
               namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
           );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "VEGETFOODS.Controllers.MVC_Controller" }
            );
        }
    }
}
