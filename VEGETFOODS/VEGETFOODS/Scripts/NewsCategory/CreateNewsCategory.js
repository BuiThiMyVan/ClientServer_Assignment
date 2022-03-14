var vmCreateNewsCategory = new Vue({
    el: "#CreateNewsCategory",
    data: {
        Id: 0,
        NewsCateTitle: '',
        NewsDesc: '',
        IsActive: -1,

        error_name: ''
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
        createCategory: function () {

            var self = this;
            var bug = 0;

            if (self.NewsCateTitle == '') {
                self.error_name = 'Tên danh mục không được để trống';
                bug++;
            }

            if (bug != 0) {
                return false;
            }

            AddLoader();
            var modal = {
                NewsCateTitle: self.NewsCateTitle,
                NewsDesc: self.NewsDesc,
            };

            $.ajax({
                data: modal,
                url: "/api/NewsCategoryApi/CreateNewsCategory",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Tạo mới danh mục thành công');
                    window.location.href = "/Admin/NewsCategory/Index";
                } else {
                    alert('Đã xảy ra lỗi khi cập nhật danh mục sản phẩm');
                }
                HiddenLoader();

            });
        },

    }
})