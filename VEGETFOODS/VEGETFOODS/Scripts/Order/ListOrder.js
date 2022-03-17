var vmListOrder = new Vue({
    el: "#ListOrder",
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
        RoleId: -1,
        OrderStatus: -1
    },

    methods: {
        first: function () {
            this.currentPage = 1;
            this.getListOrder();
        },

        last: function () {
            this.currentPage = this.totalPage;
            this.getListOrder();
        },

        next: function () {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
                this.getListOrder();
            }
        },

        prev: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getListOrder();
            }
        },

        validatePage: function () {
            var page = $("#pagePicked").val();
            if (page > this.totalPage) {
                this.currentPage = this.totalPage;
            }
        },

        getListOrder: function () {
            AddLoader();
            var self = this;
            var modal = {
                pageIndex: self.currentPage,
                pageSize: self.pageSize,
                txtSearch: self.txtSearch.trim(),
                cateId: self.OrderStatus
            };
            $.ajax({
                data: modal,
                url: "/api/OrderApi/GetListOrder",
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            }).then(res => {
                self.list = res.data.list;
                self.totalPage = res.data.totalPage;
                self.pageView = res.data.pageView;
                HiddenLoader();
                $("#ListOrder").css("display", "block");
            });
        },        

    }
})

vmListOrder.getListOrder();

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode == 13) {
        vmListOrder.getListOrder();
    } else if ((charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}