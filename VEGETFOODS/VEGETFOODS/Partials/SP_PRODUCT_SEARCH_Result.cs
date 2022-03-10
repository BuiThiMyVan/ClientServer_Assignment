using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_PRODUCT_SEARCH_Result
    {
        public class SP_PRODUCT_SEARCH_ResultDTO
        {
            public Nullable<long> ROWID { get; set; }
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public string ProductUnit { get; set; }
            public string ProductImages { get; set; }
            public Nullable<byte> IsActive { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }
            public string CreateBy { get; set; }
            public Nullable<double> ProductPrice { get; set; }
            public string CategoryName { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

        }
        public class JsonPRODUCT
        {
            public object[] list { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public SP_PRODUCT_SEARCH_ResultDTO CopyObjectForSP_PRODUCT_SEARCH_ResultApi()
        {
            var sp_Product_Search_ResultDTO = new SP_PRODUCT_SEARCH_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Product_Search_ResultDTO);
            return sp_Product_Search_ResultDTO;
        }
    }
}