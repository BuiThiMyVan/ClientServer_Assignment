var vmProductDetail = new Vue({
    el: "#ProductDetail",
    data: {
        ProductID: 0,
        ProductName: '',
        ProductCategoryId: 0,
        ProductImages: '',
        ProductShortDesc: '',
        ProductLongDesc: '',
        ProductPrice: 0,
        ProductUnit: '',
        ProductIngredient: '',
        ProductSeason: '',
        IsActive: 0,
        ProductAmount: 0,
        ConsID: 0,
        ListCategoryActive: [],
        ListConsignment: [],
        QtyOrder: 1,
        TotalSold: 0,
        RateScore: 0,
        RateCount: 0,

        error_name: '',
        error_price: '',
        error_unit: '',
        error_cate: '',

        batchNo: '',
        amount: 0,
        exp: '',
        ConsIsActive: 0,
        error_batchNo: '',
        error_amount: '',
        error_exp: '',
        error_qty: '',
        message_addcart: ''
    },

    watch: {
        QtyOrder: function () {
            var self = this;
            if (self.QtyOrder > self.ProductAmount) {
                self.error_qty = "Số lượng hàng vượt quá mức cho phép"
            } else if (self.QtyOrder < 1) {
                self.QtyOrder = 1;
            } else {
                self.error_qty = "";
            }
        },
    },

    methods: {
        getAllConsigment: function () {
            var self = this;
            $.ajax({
                url: "/api/ProductApi/GetConsignmentByProductId?productId=" + productId,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.ListConsignment = res.data.list;
                if (self.ListConsignment != null) {
                    for (var i of self.ListConsignment) {
                        if (i.IsActive == 1) {
                            self.ProductAmount = i.ConsProductAmout;
                            self.ConsID = i.BathNo;
                            break;
                        }
                    }
                }

            });
        },

        getInfoProduct: function () {
            var self = this;
            $.ajax({
                url: "/api/ProductApi/GetProductById?ProductId=" + productId,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.ProductID = productId;
                self.ProductName = res.data.ProductName == null ? '' : res.data.ProductName;
                self.ProductImages = res.data.ProductImages == null ? '' : res.data.ProductImages;
                self.ProductCategoryId = res.data.ProductCategoryId == null ? -1 : res.data.ProductCategoryId;
                self.ProductLongDesc = res.data.ProductLongDesc == null ? '' : res.data.ProductLongDesc;
                self.ProductShortDesc = res.data.ProductShortDesc == null ? '' : res.data.ProductShortDesc;
                self.ProductPrice = res.data.ProductPrice == null ? 0 : res.data.ProductPrice;
                self.ProductUnit = res.data.ProductUnit == null ? '' : res.data.ProductUnit;
                self.ProductSeason = res.data.ProductSeason == null ? '' : res.data.ProductSeason;
                self.ProductIngredient = res.data.ProductIngredient == null ? '' : res.data.ProductIngredient;
                self.IsActive = res.data.IsActive == null ? 0 : res.data.IsActive;
                self.TotalSold = res.totalSold;
                self.RateScore = res.rateScore;
                self.RateCount = res.RateCount;

            });
        },

        getInfoConsignment: function (batchNo) {
            var self = this;
            $.ajax({
                url: "/api/ProductApi/GetConsignmentById?bathNo=" + batchNo,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.batchNo = res.data.BathNo;
                self.amount = res.data.ConsProductAmout == null ? 0 : res.data.ConsProductAmout;
                self.exp = res.data.ProductEXPFormat;
                self.ConsIsActive = res.data.IsActive == null ? 0 : res.data.IsActive;

            });
        },

        decreaseQty: function () {
            var self = this;
            if (self.QtyOrder > 1) {
                self.QtyOrder--;
            }
        },

        increaseQty: function () {
            var self = this;
            if (self.QtyOrder < self.ProductAmount) {
                self.QtyOrder++;
            }
        },

        addToCart: function (productId) {
            var self = this;
            $.ajax({
                url: "/Cart/AddItem?productId=" + productId + "&quantity=" + self.QtyOrder,
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                alert(res);
            });
        },
    }
})

vmProductDetail.getInfoProduct();
vmProductDetail.getAllConsigment();