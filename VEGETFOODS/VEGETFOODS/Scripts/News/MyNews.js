var vmMyNews = new Vue({
    el: "#MyNews",
    data: {
        NewsTitle: '',
        NewsCateID: 0,
        NewsImages: '',
        NewsSummary: '',
        NewsBody: '',
        Hashtags: '',
        ListCategoryActive: [],
        IsActive: -1,

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

        getInfoNews: function () {
            AddLoader();
            var self = this;
            $.ajax({
                url: "/api/NewsApi/GetNewsById?newsId=" + newsId,
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.NewsTitle = res.data.NewsTitle;
                self.NewsCateID = res.data.NewsCateID;
                self.NewsSummary = res.data.NewsSummary;
                self.NewsBody = res.data.NewsBody;
                tinymce.get("NewsBody").setContent(res.data.NewsBody);
                self.NewsImages = res.data.NewsImages;
                self.IsActive = res.data.IsActive;
                self.Hashtags = res.data.Hashtags;
                HiddenLoader();
            });
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

        updateNews: function () {

            var self = this;
            var bug = 0;

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

            var modal = {
                NewsID: newsId,
                NewsTitle: self.NewsTitle,
                NewsImages: self.NewsImages,
                NewsSummary: self.NewsSummary,
                NewsBody: self.NewsBody,
                NewsCateID: self.NewsCateID,
                Hashtags: self.Hashtags,
                CreateBy: userLogin,
                IsActive: self.IsActive ? 1 : 0
            };
            $.ajax({
                data: modal,
                url: "/api/NewsApi/UpdateNews",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                if (res.message == 200) {
                    alert('Cập nhật tin tức thành công');
                } else {
                    alert('Đã xảy ra lỗi khi thêm mới tin tức');
                }

            });
        },

    }
})

vmMyNews.getAllCategoryActive();
vmMyNews.getInfoNews();