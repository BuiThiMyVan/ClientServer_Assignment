var vmListNews = new Vue({
    el: "#ListNews",
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
        CountAllNews: 0,
        VName: "",
        RoleId: -1
    },

    methods: {
        first: function () {
            this.currentPage = 1;
            this.getListNews();
        },

        last: function () {
            this.currentPage = this.totalPage;
            this.getListNews();
        },

        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListNews();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListNews();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getListNews: function () {
            AddLoader();
            var self = this;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim()
            };
            $.ajax({
                data: modal,
                url: "/api/NewsApi/GetListNews",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#ListNews").css("display", "block");
            });
        },

        deleteNews: function (newsID) {
            if (confirm('Bạn có chắc muốn xoá tin tức có mã ' + newsID + ' ? ')) {
                $.ajax({
                    url: "/api/NewsApi/DeleteNews?newsId=" + newsID,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                }).then(res => {
                    if (res.message == 200) {
                        alert('Xoá tin tức thành công');
                        HiddenLoader();
                        window.location.href = "/Admin/News/Index";
                    } else {
                        alert('Đã xảy ra lỗi khi xoá danh mục sản phẩm');
                    }

                });
            }
        }

    }
})

vmListNews.getListNews();