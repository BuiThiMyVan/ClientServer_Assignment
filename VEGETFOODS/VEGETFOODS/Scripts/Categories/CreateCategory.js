var vmCreateCategory = new Vue({
    el: "#CreateCategory",
    data: {
        Id: 0,
        CategoryName: '',
        CategoryParentID: 0,
        CategoryDesc: '',
        ListCategoryActive: [],

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

        createCategory: function () {

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
            var modal = {
                CategoryName: self.CategoryName,
                CategoryParentID: self.CategoryParentID,
                CategoryDesc: self.CategoryDesc,
                CreateBy: userLogin
            };
            debugger
            $.ajax({
                data: modal,
                url: "/api/CategoriesApi/CreateCategory",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Tạo mới danh mục thành công');
                    HiddenLoader();
                    window.location.href = "/Admin/Categories/Index";
                } else {
                    alert('Đã xảy ra lỗi khi thêm mới danh mục sản phẩm');
                }

            });
        },

    }
})

vmCreateCategory.getAllCategoryActive();


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}