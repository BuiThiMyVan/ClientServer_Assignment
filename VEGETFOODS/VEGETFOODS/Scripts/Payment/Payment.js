var vmPayment = new Vue({
    el: "#Payment",
    data: {
        list: {},
        ListConsignment: {},
        error_qty: '',
        OrderShipAddress: '',
        OrderPhone: '',
        OrderShippingNote: '',
        OrderPayMethod: 0,
        OrderTotal: 0,
        OrderFullname: '',
        OrderEmail: '',
        OrderPayMethod: 2,

        error_phone: '',
        error_address: '',
        error_name: '',
        error_email: ''
    },

    watch: {
        OrderFullname: function () {
            var self = this;
            if (self.OrderFullname == '') {
                self.error_name = "Họ tên không được để trống";
            } else {
                self.error_name = "";
            }
        },

        OrderShipAddress: function () {
            var self = this;
            if (self.OrderShipAddress == '') {
                self.error_address = "Địa chỉ không được để trống";
            } else {
                self.error_address = "";
            }
        },

        OrderEmail: function () {
            var self = this;
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (self.OrderEmail == '') {
                self.error_email = 'Email không được để trống';
            } else {
                if (regex.test(self.OrderEmail) == true) {
                    self.error_email = '';
                } else {
                    self.error_email = 'Email cần đúng định dạng';
                }
            }
        },

        OrderPhone: function () {
            var self = this;
            var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

            if (self.OrderPhone == '') {
                self.error_phone = 'Số điện thoại không được để trống';
            } else {
                if (regex.test(self.OrderPhone) == true) {
                    self.error_phone = '';
                } else {
                    self.error_phone = 'Số điện thoại cần đúng định dạng';
                }
            }
        },
    },

    methods: {
        getListCart: function () {
            AddLoader();
            var self = this;
            $.ajax({
                url: "/Cart/GetCart",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data;
                HiddenLoader();
                $("#Payment").css("display", "block");
            });
        },

        getAmount: function (qty, price) {
            return qty * price;
        },

        subTotal: function () {
            var self = this;
            var total = 0;
            for (var item of self.list) {
                total += item.Product.ProductPrice * item.Quantity;
            }
            return total;
        },

        totalCartValue: function () {
            return this.subTotal() + 30000;
        },

        createOrder: function () {
            var self = this;
            var bug = 0;

            if (self.OrderFullname == '') {
                self.error_name = "Họ tên không được để trống";
                bug++;
            }

            if (self.OrderShipAddress == '') {
                self.error_address = "Địa chỉ không được để trống";
                bug++;
            }

            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (self.OrderEmail == '') {
                self.error_email = 'Email không được để trống';
                bug++;
            } else {
                if (regex.test(self.OrderEmail) == true) {
                    
                } else {
                    self.error_email = 'Email cần đúng định dạng';
                    bug++;
                }
            }

            var regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

            if (self.OrderPhone == '') {
                self.error_phone = 'Số điện thoại không được để trống';
                bug++;
            } else {
                if (regex.test(self.OrderPhone) == true) {
                    self.error_phone = '';
                } else {
                    self.error_phone = 'Số điện thoại cần đúng định dạng';
                    bug++;
                }
            }

            if (bug != 0) {
                return false;
            }
        }
    }
})

vmPayment.getListCart();