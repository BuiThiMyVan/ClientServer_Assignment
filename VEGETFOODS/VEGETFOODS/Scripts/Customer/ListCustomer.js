var vmListCustomer = new Vue({
    el: "#ListCustomer",
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
            this.getListCustomer();
        },

        last: function () {
            this.currentPage = this.totalPage;
            this.getListCustomer();
        },

        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListCustomer();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListCustomer();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getListCustomer: function () {
            AddLoader();
            var self = this;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim()
            };
            debugger
            $.ajax({
                data: modal,
                url: "/api/CustomerApi/GetListCustomer",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#ListCustomer").css("display", "block");
            });
        },

    }
})

vmListCustomer.getListCustomer();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13) {
        vmListCustomer.getListCustomer();
    } else if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}