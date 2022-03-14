var vmMyNewsCategory = new Vue({
    el: "#MyNewsCategory",
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
        getInfoCategory: function () {
            AddLoader();
            var self = this;
            $.ajax({
                url: "/api/NewsCategoryApi/GetNewsCategoryById?NewsCategoryId=" + categoryId,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.NewsCateTitle = res.data.NewsCateTitle == null ? '' : res.data.NewsCateTitle;
                self.NewsDesc = res.data.NewsDesc == null ? '' : res.data.NewsDesc;
                self.IsActive = res.data.IsActive == null ? 0 : res.data.IsActive;
                HiddenLoader();
            });
        },

        updateCategory: function () {

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
                NewsCateID: categoryId,
                NewsCateTitle: self.NewsCateTitle,
                NewsDesc: self.NewsDesc,
                IsActive: self.IsActive == true ? 1 : 0
            };

            $.ajax({
                data: modal,
                url: "/api/NewsCategoryApi/UpdateNewsCategory",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Cập nhật danh mục thành công');                   
                } else {
                    alert('Đã xảy ra lỗi khi cập nhật danh mục sản phẩm');
                }
                HiddenLoader();

            });
        },        

    }
})

vmMyNewsCategory.getInfoCategory();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}