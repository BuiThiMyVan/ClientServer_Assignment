var vmRegister = new Vue({
    el: "#Register",
    data: {
        username: '',
        password: '',
        confirm_pass: '',
        email: '',
        hoten: '',
        diachi: '',
        sdt: '',
        error_username: '',
        error_password: '',
        error_email: '',
        error_confirm_pass: '',
        error_hoten: '',
        error_sdt: '',
        remember: false,
        error_remember: '',
        error_register: ''
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

        password: function () {
            var self = this;
            if (self.password == '') {
                self.error_password = 'Bạn cần nhập mật khẩu';
            } else {
                self.error_password = '';
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

        remember: function () {
            var self = this;
            if (!self.remember) {
                self.error_remember = 'Chưa xác nhận điều khoản';
            } else {
                self.error_remember = '';
            }
        }
    },

    methods: {
        register: function () {
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

            if (self.password == '') {
                self.error_password = 'Bạn cần nhập mật khẩu';
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

            if (self.remember == false) {
                self.error_remember = 'Chưa xác nhận điều khoản';
                bug++;
            }

            if (self.email == '') {
                self.error_email = 'Bạn cần nhập email';
            }



            if (bug != 0) {
                return false;
            }

            var modal = {
                UserCode: self.username,
                UserPassword: self.password,
                UserFullName: self.hoten,
                UserEmail: self.email,
                UserAddress: self.diachi,
                UserPhone: self.sdt
            };

            $.ajax({
                data: modal,
                url: "/api/AccountApi/Register",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.userCodeExist) {
                    self.error_register = 'Tên đăng nhập đã tồn tại'
                } else if (res.emailExist) {
                    self.error_register = 'Email đã tồn tại';
                } else {
                    alert("Đăng ký tài khoản thành công");
                }
            });
        }
    },



})