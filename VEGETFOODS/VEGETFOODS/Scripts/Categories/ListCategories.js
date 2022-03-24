var vmListCategories = new Vue({
    el: "#ListCategories",
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
        CountAllCategories: 0,
        VName: "",
        RoleId: -1
    },

    methods: {
        first: function () {
            this.currentPage = 1;
            this.getListCategories();
        },

        last: function () {
            this.currentPage = this.totalPage;
            this.getListCategories();
        },

        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListCategories();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListCategories();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getListCategories: function () {
            AddLoader();
            var self = this;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim()
            };
            $.ajax({
                data: modal,
                url: "/api/CategoriesApi/GetListCategories",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.listCategories;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#ListCategories").css("display", "block");
            });
        },

        deleteCategory: function (categoryID) {
            if (confirm('Bạn muốn xoá danh mục sản phẩm có mã ' + categoryID + ' ? Nếu xoá, các sản phẩm thuộc danh mục cũng sẽ bị xoá, bạn chắc chắn chứ?')) {
                $.ajax({
                    url: "/api/CategoriesApi/DeleteCategory?categoryId=" + categoryID,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).then(res => {
                    if (res.message == 200) {
                        alert('Xoá danh mục thành công');
                        HiddenLoader();
                        window.location.href = "/Admin/Categories/Index";
                    } else {
                        alert('Đã xảy ra lỗi khi xoá danh mục sản phẩm');
                    }

                });
            }
        }

    }
})

vmListCategories.getListCategories();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13) {
        vmListCategories.getListCategories();
    } else if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}