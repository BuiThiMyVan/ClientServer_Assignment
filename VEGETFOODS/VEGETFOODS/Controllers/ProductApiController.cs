using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VEGETFOODS.Models;
using static VEGETFOODS.SP_CONSIGNMENT_GETALL_Result;
using static VEGETFOODS.SP_PRODUCT_SEARCH_Result;

namespace VEGETFOODS.Controllers
{
    public class ProductApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        [HttpPost]
        public IHttpActionResult SearchProduct(Pagination objPage)
        {
            var totalItems = new ObjectParameter("totalItems", typeof(int));
            var startIndex = (objPage.pageIndex - 1) * objPage.pageSize;
            var count = objPage.pageSize;
            var txtSearch = objPage.txtSearch == null ? "" : objPage.txtSearch.Trim();
            var categories = context.SP_PRODUCT_SEARCH(txtSearch, startIndex, count, totalItems).ToList();
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

            JsonPRODUCT jsonreturn = new JsonPRODUCT
            {
                list = categories.Select(t => t.CopyObjectForSP_PRODUCT_SEARCH_ResultApi()).ToArray(),
                totalPage = totalPage,
                pageView = pageView
            };

            return Json(new { data = jsonreturn });

        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetProductById(int productId)
        {
            var product = context.SP_PRODUCT_GETBYID(productId).FirstOrDefault().CopyObjectForSP_PRODUCT_GETBYID_ResultApi();

            return Json(new { data = product });
        }

        [System.Web.Http.AcceptVerbs("POST")]
        public IHttpActionResult UpdateProduct(PRODUCT product)
        {
            try
            {
                context.SP_PRODUCT_UPDATE(product.ProductID, product.ProductCode, product.ProductName, product.ProductShortName, product.ProductCategoryId, product.ProductImages, product.ProductShortDesc, product.ProductLongDesc, product.ProductPrice, product.ProductUnit, product.ProductIngredient, product.ProductSeason, product.IsActive);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult CreateProduct(PRODUCT product)
        {
            try
            {
                product.ProductCode = "";
                context.SP_PRODUCT_CREATE(product.ProductCode, product.ProductName, product.ProductShortName, product.ProductCategoryId, product.ProductImages, product.ProductShortDesc, product.ProductLongDesc, product.ProductPrice, product.ProductUnit, product.ProductIngredient, product.ProductSeason, product.CreateBy);
                return Json(new { message = 200 });
            }
            catch(Exception e)
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult DeleteProduct(int productId)
        {
            try
            {
                context.SP_PRODUCT_DELETE(productId);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetConsignmentByProductId(int productId)
        {
            var consigment = context.SP_CONSIGNMENT_GETALL(productId).ToList();

            JsonCONSIGNMENT jsonreturn = new JsonCONSIGNMENT
            {
                list = consigment.Select(t => t.CopyObjectForSP_CONSIGNMENT_GETALL_ResultDTOApi()).ToArray(),
            };
            return Json(new { data = jsonreturn });
        }

        [HttpPost]
        public IHttpActionResult DeleteConsignment(string bathNo)
        {
            try
            {
                context.SP_CONSIGNMENT_DELETE(bathNo);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [System.Web.Http.AcceptVerbs("GET")]
        public IHttpActionResult GetConsignmentById(string bathNo)
        {
            var consignment = context.SP_CONSIGNMENT_GETBYID(bathNo).FirstOrDefault().CopyObjectForSP_CONSIGNMENT_GETBYID_ResultDTOApi();

            return Json(new { data = consignment });
        }

        [System.Web.Http.AcceptVerbs("POST")]
        public IHttpActionResult UpdateConsignnment(CONSIGNMENT consignment)
        {
            try
            {
                context.SP_CONSIGNMENT_UPDATE(consignment.BathNo, consignment.ConsProductAmout, consignment.IsActive, consignment.ProductEXP);
                return Json(new { message = 200 });
            }
            catch
            {
                return Json(new { message = 400 });
            }
        }

        [HttpPost]
        public IHttpActionResult CreateConsignnment(CONSIGNMENT consignment)
        {
            try
            {
                context.SP_CONSIGNMENT_CREATE(consignment.BathNo, consignment.ConsProductID, consignment.ConsProductAmout, consignment.IsActive, consignment.ProductEXP);
                return Json(new { message = 200 });
            }
            catch (Exception e)
            {
                return Json(new { message = 400 });
            }
        }

    }
}
