$(document).ready(function () {
    new Employee();
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
 * Class quản lý các sự kiện cho trang employee
 * created by mvthanh(26/12/2020)
 * */
class Employee extends BaseJs {
    constructor() {
        super();
    }

    initEvents() {
        var me = this;
        super.initEvents();
        
        //Thực hiện chức năng tìm kiếm
        $('#txtSearch').blur(me.btnFilter.bind(me));
        //thực hiện việc hiển thị tiền tệ theo định dạng vnđ
        $('#txtSalary').blur(me.viewSalary);

        //thực hiện việc load dữ liệu số trang
        this.pagination();
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
        this.domainNV = "/api/v1/employees";
    }

    setNumberPage() {
        this.numberPage = "";
    }

    setTableName() {
        this.tableName = "Employee";
    }

    loadData() {
        super.loadData();
        //mở datetimepicker
        $('#DateOfBirth').datepicker();
        $('#JoinDate').datepicker();
        $('#LevelDate').datepicker();
         //thực hiện load dữ liệu select box
        loadCombobox("/api/v1/DepartmentGroups");
        loadCombobox("/api/v1/PositionGroups");
    }
    
    btnAddOnClick() {
        super.btnAddOnClick();
        //lấy ra mã nhân viên đã tăng lên 1 đơn vị
        $.ajax({
            url: "/api/v1/employees/maxs",
            method: "GET"
        }).done(function (res) {
            //hiển thị ra màn hình
            $('#txtEmployeeCode').val(res);
        }).fail(function (res) {
            console.log(res);
        })
    }
    /**======================================
   * Hàm chức năng phân trang
   * Created by mvthanh (19/01/2021)
   * */
    pagination() {

        $.ajax({
            url: "/api/v1/Employees/counts",
            method: "GET"
        }).done(function (res) {
            BaseJs.numberInfor = res;
            BaseJs.n = Math.ceil(res / 10);
            updateNumberPage(1, BaseJs.n);
            viewInforPage(1, 'nhân viên');
        }).fail(function (res) {
            console.log(res);
        })
    }

    /**======================================
   * Hàm thực hiện chức năng phân trang
   * Created by mvthanh (23/01/2021)
   * */
    pageNumber(e) {
        try {
            var value = e.currentTarget.innerText;
            this.numberPage = "/api/v1/employees/paginations?page=" + value;
            this.loadData();
            $('.number').empty();
            updateNumberPage(value, BaseJs.n);
            viewInforPage(value,'nhân viên');
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm thực hiện chức năng lùi lại 1 trang
    * Created by mvthanh (23/01/2021)
    * */
    prevPage() {
        try {
            var value = $('.number_page:first')[0].innerText;
            if (value > 1) {
                this.numberPage = "/api/v1/employees/paginations?page=" + (value - 1);
                this.loadData();
                $('.number').empty();
                updateNumberPage((value - 1), BaseJs.n);
                viewInforPage(value - 1,'nhân viên');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
   * Hàm thực hiện chức năng tiến lên 1 trang
   * Created by mvthanh (23/01/2021)
   * */
    nextPage() {
        try {
            var value = $('.number_page:first')[0].innerText;
            if (value < BaseJs.n) {
                this.numberPage = "/api/v1/employees/paginations?page=" + (Number(value) + 1);
                this.loadData();
                $('.number').empty();
                updateNumberPage((Number(value) + 1), BaseJs.n);
                viewInforPage(Number(value) + 1,'nhân viên');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm thực hiện chức năng quay lại trang đầu tiên
    * Created by mvthanh (23/01/2021)
    * */
    firstPage() {
        try {
            this.numberPage = "/api/v1/employees/paginations?page=" + 1;
            this.loadData();
            $('.number').empty();
            updateNumberPage(1, BaseJs.n);
            viewInforPage(1,'nhân viên');
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm thực hiện chức năng tiến đến trang cuối cùng
    * Created by mvthanh (23/01/2021)
    * */
    lastPage() {
        try {
            this.numberPage = "/api/v1/employees/paginations?page=" + BaseJs.n;
            this.loadData();
            $('.number').empty();
            updateNumberPage(BaseJs.n, BaseJs.n);
            viewInforPage(BaseJs.n,'nhân viên');
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
    * Thực hiện chức năng tìm kiếm
    * CreatedBy MVThanh (23/01/2021)
    * */
    btnFilter() {
        var me = this;
        try {
            var value = $('#txtSearch').val();
            var departmentId = $('select[filter="departmentId"]').val();
            var positionId = $('select[filter="positionId"]').val();
            me.filter = "/api/v1/employees/filters?specs=" + value + "&departmentId=" + departmentId + "&positionId=" + positionId;
            me.loadData();
        }
        catch (e) {
            console.log(e);
        }
    }
    /**
     * Thực hiện hiển thị định dạng tiền tệ vnđ khi nhập xong trong thẻ input
     * CreatedBy MVThanh(22/01/2021)
     * */
    viewSalary() {
        var me = this;
        try {
            var value = $(me).val();
            value = formatMoney(value);
            $(me).val(value);
        }
        catch (e) {
            console.log(e);
        }
    }
}

