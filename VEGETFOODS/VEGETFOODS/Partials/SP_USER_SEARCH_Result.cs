using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VEGETFOODS
{
    public partial class SP_USER_SEARCH_Result
    {
        public class SP_USER_SEARCH_ResultDTO
        {
            public Nullable<long> ROWID { get; set; }
            public string UserCode { get; set; }
            public string UserEmail { get; set; }
            public string UserFullname { get; set; }
            public Nullable<System.DateTime> UserRegistrationDate { get; set; }
            public string UserAvatar { get; set; }
            public string UserPhone { get; set; }
            public string UserAddress { get; set; }
            public Nullable<int> Role { get; set; }
            public Nullable<byte> IsActive { get; set; }

            public string CreateTimeFormat
            {
                get
                {
                    return UserRegistrationDate == null ? "" : UserRegistrationDate.GetValueOrDefault().ToString("dd/MM/yyyy");
                }
            }

        }
        public class JsonUSER
        {
            public object[] list { get; set; }
            public int totalPage { get; set; }
            public string pageView { get; set; }
        }

        public SP_USER_SEARCH_ResultDTO CopyObjectForSP_USER_SEARCH_ResultApi()
        {
            var sp_Categories_Search_ResultDTO = new SP_USER_SEARCH_ResultDTO();
            Utils.ObjectUtil.CopyPropertiesTo(this, sp_Categories_Search_ResultDTO);
            return sp_Categories_Search_ResultDTO;
        }
    }
}