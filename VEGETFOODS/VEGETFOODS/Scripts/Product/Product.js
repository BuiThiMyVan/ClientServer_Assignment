﻿var vmProduct = new Vue({
    el: "#Product",
    data: {
        currentPage: 1,
        pageSize: 12,
        pageCount: 1,
        pageView: "",
        txtSearch: '',
        Status: -1,
        list: {},
        textFilter: "Tất cả",
        CountAllProduct: 0,
        VName: "",
        RoleId: -1,
        ListCategoryActive: {},
        cateId: -1,
    },

    methods: {
        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListProduct();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListProduct();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getAllCategoryActive: function () {
            var self = this;
            $.ajax({
                url: "/api/CategoriesApi/GetAllCategoryActive",
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

        getListProduct: function () {
            AddLoader();
            var self = this;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim(),
                cateId: self.cateId
            };
            $.ajax({
                data: modal,
                url: "/api/ProductApi/SearchProductActive",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#Product").css("display", "block");
                if (self.cateId == -1) {
                    $('.product-category .product-cate-all').addClass('active');
                }
            });
        },

        getListProductByCate: function (cateId, event) {
            AddLoader();
            $('.product-category a').removeClass('active');
            $(event.target).addClass('active');
            var self = this;
            self.cateId = cateId;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim(),
                cateId: cateId
            };
            $.ajax({
                data: modal,
                url: "/api/ProductApi/SearchProductActive",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#Product").css("display", "block");
            });
        }

    }
})

vmProduct.getListProduct();
vmProduct.getAllCategoryActive();