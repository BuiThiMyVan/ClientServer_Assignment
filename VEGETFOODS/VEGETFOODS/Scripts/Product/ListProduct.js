var vmListProduct = new Vue({
    el: "#ListProduct",
    data: {
        currentPage: 1,
        pageSize: 10,
        listPageSize: [10, 25, 50],
        pageCount: 1,
        pageView: "",
        txtSearch: '',
        Status: -1,
        list: {},
        textFilter: "Tất cả",
        CountAllProduct: 0,
        VName: "",
        RoleId: -1
    },

    methods: {
        first: function () {
            this.currentPage = 1;
            this.getListProduct();
        },

        last: function () {
            this.currentPage = this.totalPage;
            this.getListProduct();
        },

        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListProduct();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListProduct();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getListProduct: function () {
            AddLoader();
            var self = this;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim()
            };
            $.ajax({
                data: modal,
                url: "/api/ProductApi/SearchProduct",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#ListProduct").css("display", "block");
            });
        },

        deleteProduct: function (productID) {
            if (confirm('Bạn có chắc muốn xoá danh mục sản phẩm có mã ' + productID + ' ? ')) {
                $.ajax({
                    url: "/api/ProductApi/DeleteProduct?productId=" + productID,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).then(res => {
                    if (res.message == 200) {
                        alert('Xoá sản phẩm thành công');
                        HiddenLoader();
                        window.location.href = "/Admin/Product/Index";
                    } else {
                        alert('Đã xảy ra lỗi khi xoá danh mục sản phẩm');
                    }

                });
            }
        }

    }
})

vmListProduct.getListProduct();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13) {
        vmListProduct.getListProduct();
    } else if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}