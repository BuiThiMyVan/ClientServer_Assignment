using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static VEGETFOODS.Models.Common;

namespace VEGETFOODS.Controllers
{
    public class AccountApiController : ApiController
    {
        VEGETFOODSEntities context = new VEGETFOODSEntities();       

        [HttpPost]
        public IHttpActionResult Register(USER objUser)
        {
            var userCodeExist = 0;
            var emailExist = 0;
            if(context.SP_USERCODE_IS_EXISTED(objUser.UserCode).FirstOrDefault() == true)
            {
                userCodeExist = 1;                
            } else if (context.SP_EMAIL_IS_EXISTED(objUser.UserEmail).FirstOrDefault() == true)
            {
                emailExist = 1;
            } else
            {
                objUser.UserPassword = objUser.EncodePassword(objUser.UserPassword);
                objUser.Role = 1;
                context.SP_USER_CREATE(objUser.UserCode, objUser.UserEmail, objUser.UserPassword, objUser.UserFullName, objUser.UserPhone, objUser.UserAddress, objUser.Role);
            }
            return Json(new { userCodeExist = userCodeExist, emailExist = emailExist });
        }

        [HttpGet]
        public IHttpActionResult GetUserByUsercode(string usercode)
        {
            var user = context.SP_USER_GETBYUSERCODE(usercode).FirstOrDefault();

            return Json(new { data = user });
        }
    }
}
