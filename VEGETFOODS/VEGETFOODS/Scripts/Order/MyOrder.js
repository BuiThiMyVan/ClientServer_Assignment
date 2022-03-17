var vmMyOrder = new Vue({
    el: "#MyOrder",
    data: {
        OrderID: 0,
        OrderCode: '',
        listDetailOrder: {},
        OrderPhone: '',
        OrderEmail: '',
        OrderFullname: '',
        CreateTime: '',
        OrderShipAddress: '',
        OrderStatus: -1
    },

    watch: {
        NewsCateTitle: function () {
            var self = this;
            if (self.NewsCateTitle == '') {
                self.error_name = 'Tên danh mục không được để trống';
            } else {
                self.error_name = '';
            }
        },
    },

    methods: {
        getOrder: function () {
            var self = this;
            $.ajax({
                url: "/api/OrderApi/GetOrderByOrderCode?orderCode=" + orderCode,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.OrderPhone = res.data.OrderPhone;
                self.OrderShipAddress = res.data.OrderShipAddress;
                self.OrderEmail = res.data.OrderEmail;
                self.OrderFullname = res.data.OrderFullname;
                self.OrderStatus = res.data.OrderStatus;
                self.OrderCode = orderCode;
                self.CreateTime = res.data.CreateTime;
                self.OrderID = res.data.OrderID;
                self.getDetailOrder();
            });
        },
        getDetailOrder: function () {
            var self = this;
            AddLoader();
            $.ajax({
                url: "/api/OrderApi/GetDetailOrder?orderId=" + self.OrderID,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.listDetailOrder = res.data;
                HiddenLoader();
                $('#MyOrder').css('display', 'block');
            });
        },
        getAmount: function (qty, price) {
            return qty * price;
        },

        subTotal: function () {
            var self = this;
            var total = 0;
            for (var index in self.listDetailOrder) {
                total += self.listDetailOrder[index].DetailPrice * self.listDetailOrder[index].DetailQuantity;
            }
            return total;
        },

        totalCartValue: function () {
            return this.subTotal() + 30000;
        },

        updateOrder: function (status) {
            if (confirm('Bạn chắc chắn muốn thay đổi trạng thái đơn hàng chứ?')) {
                var self = this;
                AddLoader();
                $.ajax({
                    url: "/api/OrderApi/UpdateOrder?status=" + status + "&orderId=" + self.OrderID,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).then(res => {
                    self.getOrder();
                    HiddenLoader();
                    $('#MyOrder').css('display', 'block');
                });
            }
            
        }
    }
})

vmMyOrder.getOrder();
