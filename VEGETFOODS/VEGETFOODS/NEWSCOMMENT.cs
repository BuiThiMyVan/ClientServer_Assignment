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
    
    public partial class NEWSCOMMENT
    {
        public int CmtID { get; set; }
        public Nullable<int> NewsID { get; set; }
        public string UserCode { get; set; }
        public string Content { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
    }
}
