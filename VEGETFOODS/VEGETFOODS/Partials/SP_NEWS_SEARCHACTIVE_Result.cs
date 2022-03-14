using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_NEWS_SEARCHACTIVE_Result
    {
        public class SP_NEWS_SEARCHACTIVE_ResultDTO
        {
            public Nullable<long> ROWID { get; set; }
            public int NewsID { get; set; }
            public string NewsTitle { get; set; }
            public string NewsCateTitle { get; set; }
            public string NewsSummary { get; set; }
            public string NewsImages { get; set; }
            public string CreateBy { get; set; }
            public Nullable<byte> IsActive { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }
            public Nullable<int> TotalNewsCmt { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }            
        }

        public class JsonNEWSACTIVE
        {
            public object[] list { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public SP_NEWS_SEARCHACTIVE_ResultDTO CopyObjectForSP_NEWS_SEARCHACTIVE_ResultApi()
        {
            var sp_Categories_Search_ResultDTO = new SP_NEWS_SEARCHACTIVE_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Categories_Search_ResultDTO);
            return sp_Categories_Search_ResultDTO;
        }
    }
}