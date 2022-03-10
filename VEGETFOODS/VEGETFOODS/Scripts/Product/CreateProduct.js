var vmCreateProduct = new Vue({
    el: "#CreateProduct",
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
        ListCategoryActive: [],

        error_name: '',
        error_price: '',
        error_unit: '',
        error_cate: ''
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

        createProduct: function () {

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

            if (self.ProductUnit == '') {
                self.error_unit = 'Đơn vị sản phẩm không được để trống';
                bug++;
            }

            if (bug != 0) {
                return false;
            }

            AddLoader();
            var modal = {
                ProductName: self.ProductName.trim(),
                ProductCategoryId: self.ProductCategoryId,
                ProductImages: self.ProductImages,
                ProductLongDesc: self.ProductLongDesc.trim(),
                ProductShortDesc: self.ProductShortDesc.trim(),
                ProductPrice: self.ProductPrice,
                ProductUnit: self.ProductUnit.trim(),
                ProductIngredient: self.ProductIngredient.trim(),
                ProductSeason: self.ProductSeason.trim(),
                CreateBy: userLogin
            };
            debugger
            $.ajax({
                data: modal,
                url: "/api/ProductApi/CreateProduct",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Tạo mới danh mục thành công');
                    HiddenLoader();
                    window.location.href = "/Admin/Product/Index";
                } else {
                    alert('Đã xảy ra lỗi khi thêm mới danh mục sản phẩm');
                    HiddenLoader();
                }

            });
        },

    }
})

vmCreateProduct.getAllCategoryActive();


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}