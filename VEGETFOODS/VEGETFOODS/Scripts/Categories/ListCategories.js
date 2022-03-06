var vmListCategories = new Vue({
    el: "#ListCategories",
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
        CountAllCategories: 0,
        VName: "",
        RoleId: -1
    },

    methods: {
        first: function () {
            this.currentPage = 1;
            this.getListCategories();
        },

        last: function () {
            this.currentPage = this.totalPage;
            this.getListCategories();
        },

        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListCategories();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListCategories();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getListCategories: function () {
            //AddLoader();
            var self = this;
            var modal = {
                page: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim()
            };
            debugger
            $.ajax({
                data: modal,
                url: "/api/CategoriesApi/GetListCategories",
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.listCategories;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#ListCategories").css("display", "block");
            });
        }

    }
})

vmListCategories.getListCategories();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13) {
        vmListCategories.getListCategories();
    } else if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}