using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VEGETFOODS.Areas.Admin.Controllers
{
    public class OrderController : Controller
    {
        // GET: Admin/Order
        public ActionResult Index()
        {
            return View();
        }

        // GET: Admin/Order
        public ActionResult Details(string orderCode)
        {
            ViewBag.OrderCode = orderCode;
            return View();
        }
    }
}