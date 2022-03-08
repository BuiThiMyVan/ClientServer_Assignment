using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_CATEGORY_GETBYID_Result
    {
        public class SP_CATEGORY_GETBYID_ResultDTO
        {
            public int CategoryID { get; set; }
            public Nullable<int> CategoryParentID { get; set; }
            public string CategoryName { get; set; }
            public string CategoryDesc { get; set; }
            public Nullable<byte> IsActive { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }
            public Nullable<System.DateTime> UpdateTime { get; set; }
            public string CreateBy { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

        }

        public SP_CATEGORY_GETBYID_ResultDTO CopyObjectForSP_CATEGORY_GETBYID_ResultApi()
        {
            var sp_Categories_GetByID_ResultDTO = new SP_CATEGORY_GETBYID_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Categories_GetByID_ResultDTO);
            return sp_Categories_GetByID_ResultDTO;
        }
    }
}