using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_PRODUCT_GETBYID_Result
    {
        public class SP_PRODUCT_GETBYID_ResultDTO {
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
            public Nullable<double> ProductPrice { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }
        }
        

        public SP_PRODUCT_GETBYID_ResultDTO CopyObjectForSP_PRODUCT_GETBYID_ResultApi()
        {
            var sp_Product_GetByID_ResultDTO = new SP_PRODUCT_GETBYID_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Product_GetByID_ResultDTO);
            return sp_Product_GetByID_ResultDTO;
        }
    }
}