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
    
    public partial class PERMISSION
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PERMISSION()
        {
            this.PERMISSION_DETAIL = new HashSet<PERMISSION_DETAIL>();
            this.USER_PERMISSION = new HashSet<USER_PERMISSION>();
        }
    
        public int PerID { get; set; }
        public string PerName { get; set; }
        public Nullable<byte> IsActive { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PERMISSION_DETAIL> PERMISSION_DETAIL { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USER_PERMISSION> USER_PERMISSION { get; set; }
    }
}