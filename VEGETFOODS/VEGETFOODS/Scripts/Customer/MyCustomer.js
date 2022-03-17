var vmMyCustomer = new Vue({
    el: "#MyCustomer",
    data: {
        Id: 0,
        UserFullName: '',
        UserPhone: '',
        UserEmail: '',
        UserAddress: '',
        UserCode: '',
        IsActive: -1,
    },

    methods: {
        getInfoCustomer: function () {
            AddLoader();
            var self = this;
            $.ajax({
                url: "/api/CustomerApi/GetCustomerByUserCode?userCode=" + UserCode,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.UserFullName = res.data.UserFullName;
                self.UserPhone = res.data.UserPhone;
                self.UserEmail = res.data.UserEmail;
                self.UserAddress = res.data.UserAddress;
                self.IsActive = res.data.IsActive;
                self.UserCode = res.data.UserCode;
                HiddenLoader();
            });
        },

        updateCustomer: function () {

            var self = this;
            self.IsActive = self.IsActive ? 1 : 0,
            AddLoader();
            $.ajax({
                url: "/api/CustomerApi/UpdateCustomerStatus?status=" + self.IsActive + "&userCode=" + UserCode,
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Cập nhật thông tin khách hàng thành công');
                } else {
                    alert('Đã xảy ra lỗi khi cập nhật thông tin khách hàng');
                }
                HiddenLoader();

            });
        },

    }
})

vmMyCustomer.getInfoCustomer();