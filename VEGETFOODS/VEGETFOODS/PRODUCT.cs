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
    
    public partial class PRODUCT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PRODUCT()
        {
            this.CONSIGNMENTS = new HashSet<CONSIGNMENT>();
            this.ORDER_DETAIL = new HashSet<ORDER_DETAIL>();
        }
    
        public int ProductID { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string ProductShortName { get; set; }
        public Nullable<int> ProductCategoryId { get; set; }
        public string ProductImages { get; set; }
        public string ProductShortDesc { get; set; }
        public string ProductLongDesc { get; set; }
        public string ProductUnit { get; set; }
        public string ProductIngredient { get; set; }
        public string ProductSeason { get; set; }
        public Nullable<System.DateTime> ProductEXP { get; set; }
        public Nullable<System.DateTime> ProductMFG { get; set; }
        public string ProductOrigin { get; set; }
        public Nullable<byte> IsActive { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public string CreateBy { get; set; }
    
        public virtual CATEGORy CATEGORy { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CONSIGNMENT> CONSIGNMENTS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ORDER_DETAIL> ORDER_DETAIL { get; set; }
    }
}
