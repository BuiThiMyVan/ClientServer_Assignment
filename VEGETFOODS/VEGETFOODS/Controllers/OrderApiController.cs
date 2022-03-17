using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using VEGETFOODS.Models;
using static VEGETFOODS.Models.Common;
using static VEGETFOODS.SP_ORDER_SEARCH_Result;

namespace VEGETFOODS.Controllers
{
    public class OrderApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [System.Web.Http.HttpPost]
        public IHttpActionResult GetListOrder(PaginationClient objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize + 1;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_ORDER_SEARCH(txtSearch, objPage.cateId, startIndex, count, totalItems).ToList();
            var totalCategories = Convert.ToInt32(totalItems.Value);
            var pageView = "";

            if (totalCategories < (objPage.pageIndex * objPage.pageSize))
            {
                pageView = (startIndex) + "-" + totalCategories + " trong tổng số " + totalCategories;
            }
            else
            {
                pageView = (startIndex) + "-" + (objPage.pageIndex * objPage.pageSize) + " trong tổng số " + totalCategories;
            }
            int totalPage = 0;
            totalPage = (int)Math.Ceiling((double)totalCategories / objPage.pageSize);

            JsonORDER jsonreturn = new JsonORDER
            {
                list = categories.Select(t => t.CopyObjectForSP_ORDER_SEARCH_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });

        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult GetOrderByOrderCode(string orderCode)
        {
            var order = context.SP_ORDER_GETBYORDERCODE(orderCode).FirstOrDefault();

            return Json(new { data = order });

        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult GetDetailOrder(int orderId)
        {
            var order = context.SP_ORDERDETAIL_GETBYORDERID(orderId).ToList();

            return Json(new { data = order });

        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult UpdateOrder(int status, int orderId)
        {
            context.SP_ORDER_UPDATE(orderId, status);

            return Json(new { data = 200 });

        }

    }
}