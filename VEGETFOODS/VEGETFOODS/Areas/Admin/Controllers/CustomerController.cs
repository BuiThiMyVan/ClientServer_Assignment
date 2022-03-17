using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VEGETFOODS.Areas.Admin.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Admin/Customer
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Details(string userCode)
        {
            ViewBag.UserCode = userCode;
            return View();
        }
    }
}