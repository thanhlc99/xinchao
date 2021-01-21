$(document).ready(function () {
    new Customer();
    //khai báo các thông tin chung cho dialog
    dialogDefault = $('#m-dialog').dialog({
        autoOpen: false,
        fluid: true,
        minWidth: 750,
        height: 637,
        resizable: true,
        position: ({
            my: "center", at: "center", of: window
        }),
        modal: true
    });
})

/**
 * Class quản lý các sự kiện cho trang customer
 * created by mvthanh(26/12/2020)
 * */
class Customer extends BaseJs {
    constructor() {
        super();
    }

    initEvents() {
        var me = this;
        super.initEvents();
        //thực hiện chức năng tìm kiếm
        $('#txtSearch').blur(function () {
            var value = $('#txtSearch').val();
            me.filter = "/api/v1/customers/filter?specs=" + value;
            me.loadData();
        })
        //load dữ liệu từng trang (phân trang)
        $('.number').on('click', 'div', me.pageNumber.bind(me));
        //load dữ liệu trang trước (phân trang)
        $('.icon_prevpage').click(me.prevPage.bind(me));
        //load dữ liệu trang sau (phân trang)
        $('.icon_nextpage').click(me.nextPage.bind(me));
        //load dữ liệu trang đầu tiên (phân trang)
        $('.icon_firstpage').click(me.firstPage.bind(me));
        //load dữ liệu trang cuối cùng (phân trang)
        $('.icon_lastpage').click(me.lastPage.bind(me));
    }

    setFilter() {
        this.filter = "";
    }

    setDomainNV() {
        this.domainNV = "/api/v1/customers";
    }

    setNumberPage() {
        this.numberPage = "";
    }
    /**======================================
    * Hàm thực hiện chức năng phân trang
    * Created by mvthanh (19/01/2021)
    * */
    pageNumber(e) {
        try {
            var value = e.currentTarget.innerText;
            this.numberPage = "/api/v1/customers/pagination?page=" + value;
            this.loadData();
            $('.number').empty();
            updateNumberPage(value, BaseJs.n);
            viewInforPage(value);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm thực hiện chức năng lùi lại 1 trang
    * Created by mvthanh (19/01/2021)
    * */
    prevPage() {
        try {
            var value = $('.number_page:first')[0].innerText;
            if (value > 1) {
                this.numberPage = "/api/v1/customers/pagination?page=" + (value - 1);
                this.loadData();
                $('.number').empty();
                updateNumberPage((value - 1), BaseJs.n);
                viewInforPage(value - 1);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
   * Hàm thực hiện chức năng tiến lên 1 trang
   * Created by mvthanh (19/01/2021)
   * */
    nextPage() {
        try {
            var value = $('.number_page:first')[0].innerText;
            if (value < BaseJs.n) {
                this.numberPage = "/api/v1/customers/pagination?page=" + (Number(value) + 1);
                this.loadData();
                $('.number').empty();
                updateNumberPage((Number(value) + 1), BaseJs.n);
                viewInforPage(Number(value) + 1);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm thực hiện chức năng quay lại trang đầu tiên
    * Created by mvthanh (19/01/2021)
    * */
    firstPage() {
        try {
            this.numberPage = "/api/v1/customers/pagination?page=" + 1;
            this.loadData();
            $('.number').empty();
            updateNumberPage(1, BaseJs.n);
            viewInforPage(1);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm thực hiện chức năng tiến đến trang cuối cùng
    * Created by mvthanh (19/01/2021)
    * */
    lastPage() {
        try {
            this.numberPage = "/api/v1/customers/pagination?page=" + BaseJs.n;
            this.loadData();
            $('.number').empty();
            updateNumberPage(BaseJs.n, BaseJs.n);
            viewInforPage(BaseJs.n);
        }
        catch (e) {
            console.log(e);
        }
    }
}