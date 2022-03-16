using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using VEGETFOODS.Common;
using static VEGETFOODS.Models.Common;

namespace VEGETFOODS.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        

        [System.Web.Http.AcceptVerbs("POST", "GET")]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CheckLogin(USER objUser)
        {
            VEGETFOODSEntities context = new VEGETFOODSEntities();

            objUser.UserPassword = objUser.EncodePassword(objUser.UserPassword);
            var result = context.SP_LOGIN(objUser.UserCode, objUser.UserPassword).FirstOrDefault();
            var jsonreturn = -1;
            var acc = new SP_USER_GETBYUSERCODE_Result();
            if (result == true)
            {
                acc = context.SP_USER_GETBYUSERCODE(objUser.UserCode).FirstOrDefault();
                if (acc.IsActive == 0)
                {
                    jsonreturn = LoginStatus.AccountBlocked.GetHashCode();
                } else
                {
                    jsonreturn = LoginStatus.Successfull.GetHashCode();
                    var userSession = new USER();
                    userSession.UserCode = acc.UserCode;
                    userSession.Role = acc.Role;
                    if (acc.Role == Role.Admin.GetHashCode())
                    {                      
                        Session.Add(CommonConstants.USER_SESSION, userSession);
                    } else if(acc.Role == Role.Client.GetHashCode())
                    {
                        HttpCookie cookie = new HttpCookie(CommonConstants.USER_COOKIES);
                        cookie[CommonConstants.USER_COOKIES] = userSession.UserCode;
                        cookie.Expires = DateTime.Now.AddDays(30);
                        Response.Cookies.Add(cookie);
                    }
                    
                }
            }
            else
            {
                var isExistedUsercode = context.SP_USERCODE_IS_EXISTED(objUser.UserCode).FirstOrDefault();
                if (isExistedUsercode == true)
                {
                    jsonreturn = LoginStatus.WrongPassword.GetHashCode();
                }
                else
                {
                    jsonreturn = LoginStatus.DoesNotExist.GetHashCode();
                }
            }

            return Json(new { result = jsonreturn, acc = acc });

        }

        [HttpGet]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Login");
        }
    }
}