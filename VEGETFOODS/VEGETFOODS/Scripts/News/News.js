﻿var vmNews = new Vue({
    el: "#News",
    data: {
        currentPage: 1,
        pageSize: 6,
        pageCount: 1,
        pageView: "",
        txtSearch: '',
        ListNewsCategory: [],
        ListNewsActive: [],
        ListNewsRecent: []
    },

    methods: {
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
                url: "/api/NewsApi/GetListNewsActive",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.ListNewsActive = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                debugger
                HiddenLoader();
            });
        },
    }
      
});

vmNews.getAllNewsCategory();
vmNews.getListNews();
vmNews.getRecentNews();