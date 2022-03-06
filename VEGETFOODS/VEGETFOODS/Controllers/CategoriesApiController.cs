using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static VEGETFOODS.CATEGORIES;

namespace VEGETFOODS.Controllers
{
    public class CategoriesApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetListCategories(int pageIndex, int pageSize, string txtSearch = "")
        {
            ObjectParameter totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (pageIndex - 1) * pageSize;
            var count = pageSize;
            var categoryName = txtSearch.Trim().Normalize(System.Text.NormalizationForm.FormC).ToLower();
            var categories = context.SP_CATEGORIES_SEARCH(categoryName, startIndex, count, totalItems).ToList();
            var totalCategories = Convert.ToInt32(totalItems.Value);
            var pageView = (startIndex + 1) + "-" + (pageIndex * pageSize) + " trong tổng số " + totalCategories;

            int totalPage = 0;
            totalPage = (int)Math.Ceiling((double)totalCategories / pageSize);

            JsonCATEGORIES jsonreturn = new JsonCATEGORIES
            {
                listCategories = categories,
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn});
        }
    }
}
