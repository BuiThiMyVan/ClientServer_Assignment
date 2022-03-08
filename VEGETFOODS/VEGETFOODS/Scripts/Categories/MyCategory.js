var vmMyCategory = new Vue({
    el: "#MyCategory",
    data: {
        Id: 0,
        CategoryName: '',
        CategoryParentID: 0,
        CategoryDesc: '',
        ListCategoryActive: [],
        IsActive: -1,

        error_name: ''
    },

    watch: {
        CategoryName: function () {
            var self = this;
            if (self.CategoryName == '') {
                self.error_name = 'Tên danh mục không được để trống';
            } else {
                self.error_name = '';
            }
        },
    },

    methods: {
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

        getInfoCategory: function () {
            var self = this;
            $.ajax({
                url: "/api/CategoriesApi/GetCategoryById?categoryId=" + categoryId,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.CategoryID = categoryId;
                self.CategoryName = res.data.CategoryName == null ? '' : res.data.CategoryName;
                self.CategoryParentID = res.data.CategoryParentID == null ? -1 : res.data.CategoryParentID;
                self.CategoryDesc = res.data.CategoryDesc == null ? '' : res.data.CategoryDesc;
                self.IsActive = res.data.IsActive == null ? 0 : res.data.IsActive;

            });
        },

        updateCategory: function () {

            var self = this;
            var bug = 0;

            if (self.CategoryName == '') {
                self.error_name = 'Tên danh mục không được để trống';
                bug++;
            }

            if (bug != 0) {
                return false;
            }

            AddLoader();
            console.log(self.IsActive);
            var modal = {
                CategoryID: categoryId,
                CategoryName: self.CategoryName,
                CategoryParentID: self.CategoryParentID,
                CategoryDesc: self.CategoryDesc,
                IsActive: self.IsActive == true ? 1 : 0
            };

            $.ajax({
                data: modal,
                url: "/api/CategoriesApi/UpdateCategory",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Cập nhật danh mục thành công');
                    HiddenLoader();
                    window.location.href = "/Admin/Categories/Index";
                } else {
                    alert('Đã xảy ra lỗi khi cập nhật danh mục sản phẩm');
                }

            });
        },        

    }
})

vmMyCategory.getInfoCategory();
vmMyCategory.getAllCategoryActive();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function deleteCategory (event, categoryId) {
    if (confirm('Bạn có chắc muốn xoá danh mục sản phẩm có mã' + categoryId + ' ? ')) {
        $.ajax({
            url: "/api/CategoriesApi/DeleteCategory?categoryId=" + categoryId,
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