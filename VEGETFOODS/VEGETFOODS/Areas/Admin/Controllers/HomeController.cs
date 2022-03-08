using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VEGETFOODS.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Dashboard
        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult Error(string error)
        {
            ViewBag.ErrorMessage = error;
            return View("_Error");
        }
    }
}