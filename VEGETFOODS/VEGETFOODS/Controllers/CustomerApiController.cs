using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VEGETFOODS.Models;
using static VEGETFOODS.SP_USER_SEARCH_Result;

namespace VEGETFOODS.Controllers
{
    public class CustomerApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [HttpPost]
        public IHttpActionResult GetListCustomer(Pagination objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_USER_SEARCH(txtSearch, startIndex, count, totalItems).Where(x => x.Role == Models.Common.Role.Client.GetHashCode()).ToList();
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

            JsonUSER jsonreturn = new JsonUSER
            {
                list = categories.Select(t => t.CopyObjectForSP_USER_SEARCH_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });

        }

        [HttpGet]
        public IHttpActionResult GetCustomerByUserCode(string userCode)
        {

            var user = context.SP_USER_GETBYUSERCODE(userCode).FirstOrDefault();
            return Json(new { data = user });

        }

        [HttpPost]
        public IHttpActionResult UpdateCustomerStatus(int status,string userCode)
        {

            context.SP_USER_UPDATE(userCode, status);
            return Json(new { message = 200 });

        }
    }
}
