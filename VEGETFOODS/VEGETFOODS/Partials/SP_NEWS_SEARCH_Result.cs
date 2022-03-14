using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_NEWS_SEARCH_Result
    {
        public class SP_NEWS_SEARCH_ResultDTO
        {
            public Nullable<long> ROWID { get; set; }
            public Nullable<int> NewsID { get; set; }
            public string NewsTitle { get; set; }
            public string NewsCateTitle { get; set; }
            public string CreateBy { get; set; }
            public Nullable<byte> IsActive { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

        }
        public class JsonNEWS
        {
            public object[] list { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public SP_NEWS_SEARCH_ResultDTO CopyObjectForSP_NEWS_SEARCH_ResultApi()
        {
            var sp_News_Search_ResultDTO = new SP_NEWS_SEARCH_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_News_Search_ResultDTO);
            return sp_News_Search_ResultDTO;
        }
    }
}