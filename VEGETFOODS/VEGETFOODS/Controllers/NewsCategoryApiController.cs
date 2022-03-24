using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VEGETFOODS.Models;
using static VEGETFOODS.SP_NEWSCATEGORY_SEARCH_Result;

namespace VEGETFOODS.Controllers
{
    public class NewsCategoryApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [HttpPost]
        public IHttpActionResult GetListCategories(Pagination objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_NEWSCATEGORY_SEARCH(txtSearch, startIndex, count, totalItems).ToList();
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

            JsonNEWSCATEGORY jsonreturn = new JsonNEWSCATEGORY
            {
                listCategories = categories.Select(t => t.CopyObjectForSP_NEWSCATEGORY_SEARCH_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });

        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetNewsCategoryById(int NewsCategoryId)
        {
            var NewsCategory = context.SP_NEWSCATEGORY_GETBYID(NewsCategoryId).FirstOrDefault();

            return Json(new { data = NewsCategory });
        }

        [System.Web.Http.AcceptVerbs("POST")]
        public IHttpActionResult UpdateNewsCategory(NEWSCATEGORY newsCategory)
        {
            try
            {
                context.SP_NEWSCATEGORY_UPDATE(newsCategory.NewsCateID, newsCategory.NewsCateTitle, newsCategory.NewsDesc, newsCategory.IsActive);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult CreateNewsCategory(NEWSCATEGORY newsCategory)
        {
            try
            {
                context.SP_NEWSCATEGORY_CREATE(newsCategory.NewsCateTitle, newsCategory.NewsDesc);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult DeleteNewsCategory(int categoryId)
        {
            try
            {
                context.SP_NEWSCATEGORY_DELETE(categoryId);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllNewsCategoryActive()
        {
            try
            {
                var categories = context.SP_NEWSCATEGORY_GETALLACTIVE().ToList();

                return Json(new { data = categories });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }
    }
}
