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
    
    public partial class CONSIGNMENT
    {
        public string BathNo { get; set; }
        public Nullable<int> ConsProductID { get; set; }
        public Nullable<double> ConsProductAmout { get; set; }
        public Nullable<byte> IsActive { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public Nullable<System.DateTime> ProductEXP { get; set; }
    
        public virtual PRODUCT PRODUCT { get; set; }
    }
}
