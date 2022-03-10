using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VEGETFOODS.Models;
using static VEGETFOODS.SP_CATEGORY_SEARCH_Result;

namespace VEGETFOODS.Controllers
{
    public class CategoriesApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [HttpPost]
        public IHttpActionResult GetListCategories(Pagination objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_CATEGORY_SEARCH(txtSearch, startIndex, count, totalItems).ToList();
            var totalCategories = Convert.ToInt32(totalItems.Value);
            var pageView = "";

            if (totalCategories < (objPage.pageIndex * objPage.pageSize))
            {
                pageView = (startIndex + 1) + "-" + totalCategories + " trong tổng số " + totalCategories;
            }
            else
            {
                pageView = (startIndex + 1) + "-" + (objPage.pageIndex * objPage.pageSize) + " trong tổng số " + totalCategories;
            }
            int totalPage = 0;
            totalPage = (int)Math.Ceiling((double)totalCategories / objPage.pageSize);

            JsonCATEGORY jsonreturn = new JsonCATEGORY
            {
                listCategories = categories.Select(t => t.CopyObjectForSP_CATEGORY_SEARCH_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });
            
        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetCategoryById(int categoryId)
        {
            var category = context.SP_CATEGORY_GETBYID(categoryId).FirstOrDefault().CopyObjectForSP_CATEGORY_GETBYID_ResultApi();

            return Json(new { data = category });
        }

        [System.Web.Http.AcceptVerbs("POST")]
        public IHttpActionResult UpdateCategory(CATEGORY category)
        {
            try
            {
                context.SP_CATEGORY_UPDATE(category.CategoryID, category.CategoryParentID, category.CategoryName, category.CategoryDesc, category.IsActive);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult CreateCategory(CATEGORY category)
        {
            try
            {
                byte isActive = 1;
                context.SP_CATEGORY_CREATE(category.CategoryParentID, category.CategoryName, category.CategoryDesc, isActive, category.CreateBy);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult DeleteCategory(int categoryId)
        {
            try
            {
                context.SP_CATEGORY_DELETE(categoryId);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllCategoryActive()
        {
            try
            {
                var categories = context.SP_CATEGORY_GETALL().ToList();

                return Json(new { data = categories });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }
    }
}
