using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VEGETFOODS.Areas.Admin.Controllers
{
    public class CategoriesController : BaseController
    {
        // GET: Admin/Categories
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Details(int categoryId)
        {
            ViewBag.CategoryId = categoryId;
            return View();
        }
    }
}