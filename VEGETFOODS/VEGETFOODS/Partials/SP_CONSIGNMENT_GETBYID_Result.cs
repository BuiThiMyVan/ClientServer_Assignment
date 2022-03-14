using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_CONSIGNMENT_GETBYID_Result
    {
        public class SP_CONSIGNMENT_GETBYID_ResultDTO
        {
            public string BathNo { get; set; }
            public Nullable<int> ConsProductID { get; set; }
            public Nullable<double> ConsProductAmout { get; set; }
            public Nullable<byte> IsActive { get; set; }
            public Nullable<System.DateTime> CreateTime { get; set; }
            public Nullable<System.DateTime> UpdateTime { get; set; }
            public Nullable<System.DateTime> ProductEXP { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return CreateTime == null ? "" : CreateTime.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

            public string ProductEXPFormat
            {
                get
                {
                    return ProductEXP == null ? "" : ProductEXP.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }
        }

        public SP_CONSIGNMENT_GETBYID_ResultDTO CopyObjectForSP_CONSIGNMENT_GETBYID_ResultDTOApi()
        {
            var sp_Consignment_GetAll_ResultDTO = new SP_CONSIGNMENT_GETBYID_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Consignment_GetAll_ResultDTO);
            return sp_Consignment_GetAll_ResultDTO;
        }
    }
}