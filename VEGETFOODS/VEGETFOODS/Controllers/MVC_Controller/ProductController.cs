using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VEGETFOODS.Controllers.MVC_Controller
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Details(int id)
        {
            ViewBag.ProductId = id;
            var session = (USER)Session["USER_SESSION"];
            var userLogin = "";
            if(session != null)
            {
                userLogin = session.UserCode;
            }
            ViewBag.UserLogin = userLogin;
            return View();
        }
    }
}