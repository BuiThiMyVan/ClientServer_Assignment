var vmNewsDetail = new Vue({
    el: "#NewsDetail",
    data: {
        NewsTitle: '',
        NewsCateID: 0,
        NewsImages: '',
        NewsSummary: '',
        NewsBody: '',
        Hashtags: '',
        ListCategoryActive: [],
        IsActive: -1,
        ListNewsCategory: [],
        ListNewsActive: [],
        ListNewsRecent: []
    },

    methods: {
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
                self.NewsImages = res.data.NewsImages;
                self.IsActive = res.data.IsActive;
                self.Hashtags = res.data.Hashtags;
                HiddenLoader();
            });
        },

        getRecentNews: function () {
            var self = this;
            $.ajax({
                url: "/api/NewsApi/GetRecentNews",
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.ListNewsRecent = res.data;
            });
        },

        getAllNewsCategory: function () {
            var self = this;
            $.ajax({
                url: "/api/NewsCategoryApi/GetAllNewsCategoryActive",
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.ListNewsCategory = res.data;
            });
        },

    }
})

vmNewsDetail.getInfoNews();
vmNewsDetail.getAllNewsCategory();
vmNewsDetail.getRecentNews();