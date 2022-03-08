using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_CATEGORY_SEARCH_Result
    {
        public class SP_CATEGORY_SEARCH_ResultDTO
        {
            public Nullable<long> ROWID { get; set; }
            public int CategoryID { get; set; }
            public string CategoryParentName { get; set; }
            public string CategoryName { get; set; }
            public string CategoryDesc { get; set; }
            public Nullable<byte> IsActive { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }
            public string CreateBy { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

        }
        public class JsonCATEGORY
        {
            public object[] listCategories { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public SP_CATEGORY_SEARCH_ResultDTO CopyObjectForSP_CATEGORY_SEARCH_ResultApi()
        {
            var sp_Categories_Search_ResultDTO = new SP_CATEGORY_SEARCH_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Categories_Search_ResultDTO);
            return sp_Categories_Search_ResultDTO;
        }
    }
}