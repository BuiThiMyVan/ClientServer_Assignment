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
    
    public partial class SHOPPING_SESSIONS
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SHOPPING_SESSIONS()
        {
            this.CART_ITEM = new HashSet<CART_ITEM>();
        }
    
        public int SessionID { get; set; }
        public string UserCode { get; set; }
        public Nullable<double> Total { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CART_ITEM> CART_ITEM { get; set; }
        public virtual USER USER { get; set; }
    }
}
