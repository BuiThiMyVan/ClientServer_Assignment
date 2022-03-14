var vmMyProduct = new Vue({
    el: "#MyProduct",
    data: {
        ProductName: '',
        ProductCategoryId: 0,
        ProductImages: '',
        ProductShortDesc: '',
        ProductLongDesc: '',
        ProductPrice: '',
        ProductUnit: '',
        ProductIngredient: '',
        ProductSeason: '',
        IsActive: 0,
        ListCategoryActive: [],
        ListConsignment: [],

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
        error_exp: ''
    },

    watch: {
        ProductName: function () {
            var self = this;
            if (self.ProductName == '') {
                self.error_name = 'Tên sản phẩm không được để trống';
            } else {
                self.error_name = '';
            }
        },
        ProductCategoryId: function () {
            var self = this;
            if (self.ProductCategoryId == 0) {
                self.error_cate = 'Danh mục không được để trống';
            } else {
                self.error_cate = '';
            }
        },

        ProductPrice: function () {
            var self = this;
            if (self.ProductPrice == 0) {
                self.error_price = 'Giá sản phẩm không được để trống';
            } else {
                self.error_price = '';
            }
        },
        ProductUnit: function () {
            var self = this;
            if (self.ProductUnit == '') {
                self.error_unit = 'Đơn vị sản phẩm không được để trống';
            } else {
                self.error_unit = '';
            }
        },

        batchNo: function () {
            var self = this;
            if (self.batchNo == '') {
                self.error_batchNo = 'Số lô không được để trống';
            } else {
                self.error_batchNo = '';
            }
        },

        amount: function () {
            var self = this;
            if (self.amount == '') {
                self.error_amount = 'Số lượng không được để trống';
            } else {
                self.error_amount = '';
            }
        },

        exp: function () {
            var self = this;
            if (self.exp == '') {
                self.error_exp = 'Hạn sử dụng không được để trống';
            } else {
                self.error_exp = '';
            }
        }
    },

    methods: {
        ChooseImage: function () {
            var self = this;
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                self.ProductImages = fileUrl;
            }
            finder.popup();
        },

        getAllCategoryActive: function () {
            var self = this;
            $.ajax({
                url: "/api/CategoriesApi/GetAllCategoryActive",
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res != 400) {
                    debugger
                    self.ListCategoryActive = res.data;
                } else {
                    alert('Đã xảy ra lỗi từ phía máy chủ');
                }

            });
        },

        getAllConsigment: function () {
            var self = this;
            $.ajax({
                url: "/api/ProductApi/GetConsignmentByProductId?productId=" + productId,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                    self.ListConsignment = res.data.list;
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
                debugger
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
                
            });
        },

        updateProduct: function () {

            var self = this;
            var bug = 0;

            if (self.ProductName == '') {
                self.error_name = 'Tên danh mục không được để trống';
                bug++;
            }

            if (self.ProductPrice == 0) {
                self.error_price = 'Giá sản phẩm không được để trống';
                bug++;
            }

            if (self.ProductCategoryId == 0) {
                self.error_cate = 'Danh mục không được để trống';
                bug++;
            }

            if (bug != 0) {
                return false;
            }

            AddLoader();
            var modal = {
                ProductID: productId,
                ProductName: self.ProductName.trim(),
                ProductCategoryId: self.ProductCategoryId,
                ProductImages: self.ProductImages,
                ProductLongDesc: self.ProductLongDesc.trim(),
                ProductShortDesc: self.ProductShortDesc.trim(),
                ProductPrice: self.ProductPrice,
                ProductUnit: self.ProductUnit.trim(),
                ProductIngredient: self.ProductIngredient.trim(),
                ProductSeason: self.ProductSeason.trim(),
                IsActive: self.IsActive == true ? 1 : 0
            };

            $.ajax({
                data: modal,
                url: "/api/ProductApi/UpdateProduct",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Cập nhật sản phẩm thành công');
                    HiddenLoader();                   
                } else {
                    alert('Đã xảy ra lỗi khi cập nhật sản phẩm');
                }

            });
        },

        deleteConsignment: function (bathNo) {
            if (confirm('Bạn có chắc muốn xoá lô hàng có mã ' + bathNo + ' ? ')) {
                $.ajax({
                    url: "/api/ProductApi/DeleteConsignment?bathNo=" + bathNo,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).then(res => {
                    if (res.message == 200) {
                        alert('Xoá lô hàng thành công');
                    } else {
                        alert('Đã xảy ra lỗi khi xoá danh mục sản phẩm');
                    }

                });
            }
        },

        createConsignment: function (type) {

            var self = this;
            var bug = 0;

            if (self.batchNo == '') {
                self.error_batchNo = 'Số lô không được để trống';
                bug++;
            }

            if (self.amount == 0) {
                self.error_amount = 'Số lượng không được để trống';
                bug++;
            }

            if (self.exp == '') {
                self.error_exp = 'Hạn sử dụng không được để trống';
                bug++;
            }

            if (bug != 0) {
                return false;
            }

            AddLoader();
            var modal = {
                BathNo: self.batchNo,
                ConsProductAmout: self.amount,
                ProductEXP: moment(self.exp, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                IsActive: self.ConsIsActive == true ? 1: 0,
                ConsProductID: productId,
                CreateBy: userLogin
            };

            var urlApi = '';
            if (type == 'create') {
                urlApi = "/api/ProductApi/CreateConsignnment";
            } else if (type = 'update') {
                urlApi = "/api/ProductApi/UpdateConsignnment";
            }
            $.ajax({
                data: modal,
                url: urlApi,
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    if (type == 'create') {
                        alert('Tạo mới lô hàng thành công');
                        window.location.href = "/Admin/Product/Details?productId=" + productId;
                    } else if (type = 'update') {
                        alert('Cập nhật lô hàng thành công');
                        window.location.href = "/Admin/Product/Details?productId=" + productId;
                    }                   
                } else {
                    if (type == 'create') {
                        alert('Đã xảy ra lỗi khi thêm mới lô hàng');
                        window.location.href = "/Admin/Product/Details?productId=" + productId;
                    } else if (type = 'update') {
                        alert('Đã xảy ra lỗi khi thêm cập nhật lô hàng');
                        window.location.href = "/Admin/Product/Details?productId=" + productId;
                    }
                    
                    
                }
                self.refreshModal();

            });
            HiddenLoader();
        },

        getInfoConsignment: function (batchNo) {
            var self = this;
            $.ajax({
                url: "/api/ProductApi/GetConsignmentById?bathNo=" + batchNo,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                debugger
                self.batchNo = res.data.BathNo;
                self.amount = res.data.ConsProductAmout == null ? 0 : res.data.ConsProductAmout;
                self.exp = res.data.ProductEXPFormat;
                self.ConsIsActive = res.data.IsActive == null ? 0 : res.data.IsActive;

            });
        },

        refreshModal: function () {
            var self = this;

            self.batchNo = '';
            self.exp = '';
            self.amount = 0;
            self.ConsIsActive = 0;

            self.error_batchNo = '';
            self.error_amount = '';
            self.error_exp = '';
        }


    }
})

vmMyProduct.getInfoProduct();
vmMyProduct.getAllCategoryActive();
vmMyProduct.getAllConsigment();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}