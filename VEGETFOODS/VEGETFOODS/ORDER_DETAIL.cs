//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VEGETFOODS
{
    using System;
    using System.Collections.Generic;
    
    public partial class ORDER_DETAIL
    {
        public int DetailID { get; set; }
        public Nullable<int> DetailProductID { get; set; }
        public Nullable<int> DetailOrderID { get; set; }
        public Nullable<double> DetailPrice { get; set; }
        public Nullable<int> DetailQuantity { get; set; }
        public string DetailSKU { get; set; }
        public Nullable<double> DetailRate { get; set; }
        public string DetailComment { get; set; }
    
        public virtual PRODUCT PRODUCT { get; set; }
        public virtual ORDER ORDER { get; set; }
    }
}
