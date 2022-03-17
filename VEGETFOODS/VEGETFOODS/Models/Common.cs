using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            WrongPassword = 3,
            AccountBlocked = 4
        }

        public enum Role
        {
            Admin = 1,
            Client = 2
        }

        public enum OrderSatus
        {
            All = -1,
            ToShip = 1,
            ToReceived = 2,
            Cancelled = 3,
            Completed = 4
        }

        public class ContentMetadataProduct
        {
            [AllowHtml]
            public string ProductLongDesc { get; set; }
        }

        public class PaginationClient {

            public int pageIndex { get; set; }

            public int pageSize { get; set; }

            public string txtSearch { get; set; }

            public int cateId { get; set; }
        }

        public class JsonObject
        {
            public object[] list { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }
    }
}