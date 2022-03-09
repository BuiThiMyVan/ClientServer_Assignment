using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS.Models
{
    public class Common
    {
        public enum ActiveStatus
        {
            InActive = 0,
            Active = 1
        }

        public enum LoginStatus
        {
            Successfull = 1,
            DoesNotExist = 2,
            WrongPassword = 3
        }
    }
}