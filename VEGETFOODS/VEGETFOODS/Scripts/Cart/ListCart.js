var vmListCart = new Vue({
    el: "#ListCart",
    data: {
        list: {},
        ListConsignment: {},
        error_qty: '',
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
                $("#ListCart").css("display", "block");
            });
        },

        getAmount: function (qty, price) {
            return qty * price;
        },

        deleteItem: function (productId) {
            var self = this;
            $.ajax({
                url: "/Cart/DeleteItem?productId=" + productId,
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res == 201) {
                    window.location.href = "/Cart/Index";
                } else {
                    self.getListCart();
                }
            });
        },

        updateAmount: function (productId, index, productAmount, event) {
            var self = this;
            
            var qtyCur = $(event.target).val();
            self.list[index].Quantity = parseInt(qtyCur);
            if (qtyCur == '' || qtyCur == null) {
                $(event.target).parent().next().text("Số lượng không hợp lệ");
            } else if (qtyCur > productAmount) {
                $(event.target).parent().next().text("Số lượng hàng trong kho không đủ");
            } else {
                $(event.target).parent().next().text("");
                $.ajax({
                    url: "/Cart/UpdateAmount?productId=" + productId + "&qty=" + qtyCur,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).then(res => {
                    self.getListCart();
                });
            }
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
        }
    }
})

vmListCart.getListCart();