using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VEGETFOODS.Models;

namespace VEGETFOODS.Controllers.MVC_Controller
{
    public class CartController : Controller
    {
        private const string CartCookies = "CartCookies";
        VEGETFOODSEntities context = new VEGETFOODSEntities();

        // GET: Cart
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetCart()
        {
            HttpCookie cart = Request.Cookies[CartCookies];
            List<CartItem> list = new List<CartItem>();
            if(cart != null)
            {
                var cartItems = Request.Cookies[CartCookies].Value.Replace(CartCookies + "=", "");
                list = JsonConvert.DeserializeObject<List<CartItem>>(cartItems);
            }
            return Json(new { data = list });
        }

        [HttpPost]
        public ActionResult AddItem(int productId, int quantity)
        {
            HttpCookie cart = Request.Cookies[CartCookies];
            var productCur = context.SP_PRODUCT_GETBYID(productId).FirstOrDefault().CopyObjectForPRODUCTApi();
            productCur.ProductLongDesc = "";
            var consignment = context.SP_CONSIGNMENT_GETALL(productId).ToList();
            var productAmount = consignment.Where(x => x.IsActive == 1).FirstOrDefault().ConsProductAmout;
            if (cart != null)
            {
                var cartItems = Request.Cookies[CartCookies].Value.Replace(CartCookies + "=", "");                
                List<CartItem> list = JsonConvert.DeserializeObject<List<CartItem>>(cartItems);
                if(list.Exists(x => x.Product.ProductID == productId))
                {
                    foreach (var item in list)
                    {
                        if (item.Product.ProductID == productId)
                        {
                            item.Quantity += quantity;
                        }
                    }
                } else
                {
                    var item = new CartItem();
                    item.Product = productCur;
                    item.Quantity = quantity;
                    item.ProductAmount = productAmount.GetValueOrDefault();
                    list.Add(item);
                }
                var jsonCart = JsonConvert.SerializeObject(list);
                cart[CartCookies] = jsonCart;
                cart.Expires = DateTime.Now.AddDays(365);
                Response.Cookies.Add(cart);

            } else
            {
                // tạo mới đối tượng item
                
                var item = new CartItem();
                item.Product = productCur;
                item.Quantity = quantity;
                item.ProductAmount = productAmount.GetValueOrDefault();
                var list = new List<CartItem>();
                list.Add(item);
                var jsonCart = JsonConvert.SerializeObject(list);
                //
                HttpCookie cookie = new HttpCookie(CartCookies);
                cookie[CartCookies] = jsonCart;
                cookie.Expires = DateTime.Now.AddDays(365);
                Response.Cookies.Add(cookie);
            }
            var message = "Thêm vào giỏ hàng thành công";
            return Json(message);
        }

        [HttpPost]
        public ActionResult DeleteItem(int productId)
        {
            HttpCookie cart = Request.Cookies[CartCookies];
            var cartItems = Request.Cookies[CartCookies].Value.Replace(CartCookies + "=", "");
            List<CartItem> list = JsonConvert.DeserializeObject<List<CartItem>>(cartItems);

            if(list.Count == 1)
            {
                cart.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(cart);
                return Json(201);
            } else
            {
                for (var i = 0; i < list.Count; i++)
                {
                    if(list[i].Product.ProductID.Equals(productId))
                    {
                        list.RemoveAt(i);
                        break;
                    }
                }
                var jsonCart = JsonConvert.SerializeObject(list);
                cart[CartCookies] = jsonCart;
                cart.Expires = DateTime.Now.AddDays(365);
                Response.Cookies.Add(cart);
                return Json(200);
            } 
        }

        [HttpPost]
        public ActionResult UpdateAmount(int productId, double qty)
        {
            HttpCookie cart = Request.Cookies[CartCookies];
            var cartItems = Request.Cookies[CartCookies].Value.Replace(CartCookies + "=", "");
            List<CartItem> list = JsonConvert.DeserializeObject<List<CartItem>>(cartItems);

            for (var i = 0; i < list.Count; i++)
            {
                if (list[i].Product.ProductID.Equals(productId))
                {
                    list[i].Quantity = qty;
                    break;
                }
            }
            var jsonCart = JsonConvert.SerializeObject(list);
            cart[CartCookies] = jsonCart;
            cart.Expires = DateTime.Now.AddDays(365);
            Response.Cookies.Add(cart);
            return Json(200);

        }
    }
}