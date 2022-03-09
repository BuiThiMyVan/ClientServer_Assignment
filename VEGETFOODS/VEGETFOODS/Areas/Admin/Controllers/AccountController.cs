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
                jsonreturn = LoginStatus.Successfull.GetHashCode();
                acc = context.SP_USER_GETBYUSERCODE(objUser.UserCode).FirstOrDefault();

                var userSession = new USER();
                userSession.UserCode = acc.UserCode;
                userSession.Role = acc.Role;
                Session.Add(CommonConstants.USER_SESSION, userSession);
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