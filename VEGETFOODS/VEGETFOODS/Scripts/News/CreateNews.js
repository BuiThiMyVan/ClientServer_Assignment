var vmCreateNews = new Vue({
    el: "#CreateNews",
    data: {
        NewsTitle: '',
        NewsCateID: 0,
        NewsImages: '',
        NewsSummary: '',
        NewsBody: '',
        Hashtags: '',
        ListCategoryActive: [],

        error_name: '',
        error_body: '',
        error_cate: ''
    },

    watch: {
        NewsTitle: function () {
            var self = this;
            if (self.NewsTitle == '') {
                self.error_name = 'Tiêu đề tin tức không được để trống';
            } else {
                self.error_name = '';
            }
        },
        NewsCateID: function () {
            var self = this;
            if (self.NewsCateID == 0) {
                self.error_cate = 'Danh mục không được để trống';
            } else {
                self.error_cate = '';
            }
        },
        NewsBody: function () {
            var self = this;
            if (self.NewsBody == '') {
                self.error_body = 'Đơn vị sản phẩm không được để trống';
            } else {
                self.error_body = '';
            }
        }
    },

    methods: {
        ChooseImage: function () {
            var self = this;
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                self.NewsImages = fileUrl;
            }
            finder.popup();
        },

        getAllCategoryActive: function () {
            var self = this;
            $.ajax({
                url: "/api/NewsCategoryApi/GetAllNewsCategoryActive",
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res != 400) {
                    self.ListCategoryActive = res.data;
                } else {
                    alert('Đã xảy ra lỗi từ phía máy chủ');
                }

            });
        },

        createNews: function () {

            var self = this;
            var bug = 0;
           
            var test = tinyMCE.get('NewsBody').getContent();
            console.log(test);

            if (self.NewsTitle == '') {
                self.error_name = 'Tiêu đề không được để trống';
                bug++;
            }

            if (self.NewsBody == '') {
                self.error_body = 'Bài viết không được để trống';
                bug++;
            }

            if (self.NewsCateID == 0) {
                self.error_cate = 'Danh mục không được để trống';
                bug++;
            }

            if (bug != 0) {
                return false;
            }

            AddLoader();
            var modal = {
                NewsTitle: self.NewsTitle,
                NewsImages: self.NewsImages,
                NewsSummary: self.NewsSummary,
                NewsBody: self.NewsBody,
                NewsCateID: self.NewsCateID,
                Hashtags: self.Hashtags,
                CreateBy: userLogin
            };
            debugger
            $.ajax({
                data: modal,
                url: "/api/NewsApi/CreateNews",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Tạo mới tin tức thành công');
                    HiddenLoader();
                    window.location.href = "/Admin/News/Index";
                } else {
                    alert('Đã xảy ra lỗi khi thêm mới tin tức');
                    HiddenLoader();
                }

            });
        },

    }
})

vmCreateNews.getAllCategoryActive();


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}