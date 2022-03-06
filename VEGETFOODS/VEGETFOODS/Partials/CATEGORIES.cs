using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class CATEGORIES
    {
        public class CATEGORIESDTO
        {
            public int CategoryID { get; set; }

            public int CategoryParentID { get; set; }

            public string CategoryName { get; set; }

            public string CategoryDesc { get; set; }

            public int IsActive { get; set; }

            public DateTime? CreateTime { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

            public DateTime? UpdateTime { get; set; }

            public string UpdateTimeFormat
            {
                get
                {
                    return UpdateTime == null ? "" : UpdateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

            public string CreateBy { get; set; }
        }
        public class JsonCATEGORIES
        {
            public List<SP_CATEGORIES_SEARCH_Result> listCategories { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public CATEGORIESDTO CopyObjectForMovieApi()
        {
            var kol_campaignDTO = new CATEGORIESDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, kol_campaignDTO);
            return kol_campaignDTO;
        }
    }
}