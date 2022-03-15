using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS.Models
{
    public class CartItem
    {
        public PRODUCT Product { get; set; }

        public double Quantity { get; set; }

        public double ProductAmount { get; set; }
    }
}