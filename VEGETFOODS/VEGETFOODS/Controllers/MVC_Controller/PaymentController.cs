using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VEGETFOODS.Common;
using VEGETFOODS.Models;
using System.Configuration;

namespace VEGETFOODS.Controllers.MVC_Controller
{
    public class PaymentController : Controller
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        // GET: Payment
        public ActionResult Index()
        {
            HttpCookie cookie = Request.Cookies[CommonConstants.USER_COOKIES];
            var usercode = "";
            if (cookie != null)
            {
                usercode = Request.Cookies[CommonConstants.USER_COOKIES].Value.Replace(CommonConstants.USER_COOKIES + "=", "");
            }
            ViewBag.Usercode = usercode;
            return View();
        }

        [System.Web.Http.HttpPost]
        public ActionResult CreateOrder(OrderInfo objOrder)
        {
            var message = "";
            try
            {
                var orderCode = "ORDER" + DateTime.Now.ToString("yyyyMMddTHH:mm:ssZ").Replace(":", "");
                context.SP_ORDER_CREATE(objOrder.Order.OrderUserCode, objOrder.Order.OrderShipAddress, objOrder.Order.OrderPhone, objOrder.Order.OrderShippingFee, objOrder.Order.OrderShippingNote, objOrder.Order.OrderEmail, objOrder.Order.OrderPayMethod, objOrder.Order.OrderTotal, orderCode, objOrder.Order.OrderFullname);

                var orderCreated = context.SP_ORDER_GETBYORDERCODE(orderCode).FirstOrDefault();

                List<CartItem> listItems = objOrder.ListItem;

                foreach (var item in listItems)
                {
                    var consignment = context.SP_CONSIGNMENT_GETBYPRODUCTID(item.Product.ProductID).Where(x => x.IsActive == 1).FirstOrDefault();
                    context.SP_ORDERDETAIL_CREATE(item.Product.ProductID, orderCreated.OrderID, item.Product.ProductPrice, item.Quantity, consignment.BathNo);
                    var newAmount = consignment.ConsProductAmout - item.Quantity;
                    context.SP_CONSIGMENT_UPDATEAMOUNT(newAmount, consignment.BathNo);
                }

                HttpCookie cart = Request.Cookies["CartCookies"];
                cart.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(cart);

                string content = System.IO.File.ReadAllText(Server.MapPath("~/Content/template/neworder.html"));

                content = content.Replace("{{CustomerName}}", objOrder.Order.OrderFullname);
                content = content.Replace("{{ OrderCode}}", orderCode);
                content = content.Replace("{{Phone}}", objOrder.Order.OrderPhone);
                content = content.Replace("{{Email}}", objOrder.Order.OrderEmail);
                content = content.Replace("{{Address}}", objOrder.Order.OrderShipAddress);
                content = content.Replace("{{Total}}", objOrder.Order.OrderTotal.GetValueOrDefault().ToString("N0"));
                var toEmail = ConfigurationManager.AppSettings["ToEmailAddress"].ToString();

                new MailHelper().SendMail(objOrder.Order.OrderEmail, "Đơn hàng mới từ Vegetfoods", content);
                new MailHelper().SendMail(toEmail, "Đơn hàng mới từ Vegetfoods", content);
            } catch(Exception e)
            {
                message = "Đã xảy ra lỗi từ phía máy chủ";
            }
            

            return Json(new { message = message });
        }

        // GET: Payment
        public ActionResult OrderSuccesfully()
        {           
            return View();
        }

        public ActionResult SearchOrder()
        {
            return View();
        }
    }
}