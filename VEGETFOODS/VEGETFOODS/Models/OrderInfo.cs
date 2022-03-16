using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS.Models
{
    public class OrderInfo
    {
        public ORDER Order { get; set; }
        public List<CartItem> ListItem { get; set; }
    }
}