var vmAccountDetail = new Vue({
    el: "#AccountDetail",
    data: {
        username: '',
        password: '',
        confirm_pass: '',
        email: '',
        hoten: '',
        diachi: '',
        sdt: '',
        old_pass: '',
        error_username: '',
        error_email: '',
        error_confirm_pass: '',
        error_hoten: '',
        error_sdt: '',
        error_register: '',
        error_diachi: '',
        
    },

    watch: {
        username: function () {
            var self = this;
            if (self.username == '') {
                self.error_username = 'Bạn cần điền tên đăng nhập';
            } else {
                self.error_username = '';
            }
        },

        confirm_pass: function () {
            var self = this;
            if (self.confirm_pass !== self.password) {
                self.error_confirm_pass = 'Mật khẩu nhập lại không khớp';
            } else {
                self.error_confirm_pass = '';
            }
        },

        hoten: function () {
            var self = this;
            if (self.hoten == '') {
                self.error_hoten = 'Bạn cần nhập họ tên';
            } else {
                self.error_hoten = '';
            }
        },

        email: function () {
            var self = this;
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (self.email == '') {
                self.error_email = 'Bạn cần nhập email';
            } else {
                debugger
                if (regex.test(self.email) == true) {
                    self.error_email = '';
                } else {
                    self.error_email = 'Bạn cần nhập đúng định dạng email';
                }
            }
        },

        sdt: function () {
            var self = this;
            var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

            if (self.sdt == '') {
                self.error_sdt = 'Bạn cần nhập số điện thoại';
            } else {
                if (regex.test(self.sdt) == true) {
                    self.error_sdt = '';
                } else {
                    self.error_sdt = 'Bạn cần nhập đúng định dạng số điện thoại';
                }
            }
        },

        diachi: function () {
            var self = this;
            if (!self.diachi) {
                self.error_diachi = 'Bạn cần nhập địa chỉ';
            } else {
                self.error_diachi = '';
            }
        }
    },

    methods: {
        update: function () {
            var self = this;
            var bug = 0;

            if (self.username == '') {
                self.error_username = 'Bạn cần điền tên đăng nhập';
                bug++;
            }

            if (self.email == '') {
                self.error_email = 'Bạn cần điền email';
                bug++;
            }

            if (self.confirm_pass !== self.password) {
                self.error_confirm_pass = 'Mật khẩu nhập lại không khớp';
                bug++;
            }

            if (self.hoten == '') {
                self.error_hoten = 'Bạn cần nhập họ tên';
                bug++;
            }

            if (self.sdt == '') {
                self.error_sdt = 'Bạn cần nhập số điện thoại';
                bug++;
            }

            if (self.email == '') {
                self.error_email = 'Bạn cần nhập email';
                bug++;
            }

            if (self.error_register != '') {
                bug++;
            }



            if (bug != 0) {
                return false;
            }

            var modal = {
                UserCode: self.username,
                UserPassword: self.password == '' ? self.old_pass : self.password,
                UserFullName: self.hoten,
                UserEmail: self.email,
                UserAddress: self.diachi,
                UserPhone: self.sdt
            };

            $.ajax({
                data: modal,
                url: "/api/AccountApi/UpdateInfoUser",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {              
                if (res.message == 200) {
                    if (res.emailExist) {
                        self.error_register = 'Email đã tồn tại';
                    } else {
                        self.error_register = '';
                        alert("Cập nhật tài khoản thành công");
                    }
                } else {
                    alert("Đã xảy ra lỗi từ phía máy chủ");

                }
            });
        },

        getInfoCustomer: function () {
            AddLoader();
            var self = this;
            $.ajax({
                url: "/api/AccountApi/GetUserByUsercode?userCode=" + UserCode,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.hoten = res.data.UserFullName;
                self.sdt = res.data.UserPhone;
                self.email = res.data.UserEmail;
                self.diachi = res.data.UserAddress;
                self.username = res.data.UserCode;
                self.old_pass = res.data.UserPassword;
                HiddenLoader();
            });
        },
    },
})

vmAccountDetail.getInfoCustomer();