using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_ORDER_SEARCH_Result
    {
        public class SP_ORDER_SEARCH_ResultDTO
        {
            public Nullable<long> ROWID { get; set; }
            public int OrderID { get; set; }
            public string OrderUserCode { get; set; }
            public string OrderPhone { get; set; }
            public Nullable<byte> OrderStatus { get; set; }
            public string OrderCode { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }
            public string OrderFullname { get; set; }
            public string OrderShipAddress { get; set; }
            public string OrderEmail { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }            
        }

        public class JsonORDER
        {
            public object[] list { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public SP_ORDER_SEARCH_ResultDTO CopyObjectForSP_ORDER_SEARCH_ResultApi()
        {
            var sp_Categories_Search_ResultDTO = new SP_ORDER_SEARCH_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Categories_Search_ResultDTO);
            return sp_Categories_Search_ResultDTO;
        }
    }
}