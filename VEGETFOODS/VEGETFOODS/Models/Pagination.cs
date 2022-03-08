using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS.Models
{
    public class Pagination
    {
        public int pageIndex { get; set; }

        public int pageSize { get; set; }

        public string txtSearch { get; set; }
    }
}