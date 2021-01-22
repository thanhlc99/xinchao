/**
 * Hàm cha của employee và customer
 * created by mvthanh(26/12/2020)
 * */
class BaseJs {
    constructor() {
        this.domainNV = '';
        this.filter = '';
        this.numberPage = '';
        this.departmentGroup = '';
        this.positionGroup = '';
        this.tableName = "";
        this.setDomainNV();
        this.setFilter();
        this.setDepartmentGroup();
        this.setPositionGroup();
        this.setTableName();
        this.setNumberPage();
        //thực hiện việc load dữ liệu ra
        this.loadData();
        //thực hiện việc load dữ liệu số trang
        this.pagination();
        this.initEvents();
    }

    /**======================================
    * Hàm xét đường dẫn lấy dữ liệu
    * Created by mvthanh (26/12/2020)
    **/
    setDomainNV() {

    }

    /**======================================
    * Hàm xét đường dẫn tìm kiếm
    * Created by mvthanh (17/01/2021)
    **/
    setFilter() {

    }
    /**======================================
    * Hàm xét đường dẫn tìm kiếm
    * Created by mvthanh (19/01/2021)
    **/
    setNumberPage() {

    }
    /**
     *Hàm xét đường dẫn combobox DepartmentGroup
    * Created by mvthanh (21/01/2021)
     * */
    setDepartmentGroup() {

    }
    /**
     *Hàm xét đường dẫn combobox PositionGroup
    * Created by mvthanh (21/01/2021)
     * */
    setPositionGroup() {

    }

    setTableName() {

    }
    /**======================================
    * Hàm chứa các sự kiện trong form
    * Created by mvthanh (26/12/2020)
     **/
    initEvents() {
        var me = this;
        //Sự kiện khi ấn nút thêm
        $('#btnAdd').click(me.btnAddOnClick.bind(me));

        //sự kiện khi ấn nút load
        $('#btnRefresh').click(me.btnRefresh.bind(me));


        //Hiển thị thông tin chi tiết khi nhấn đúp chuột vô 1 bản ghi
        $('table tbody').on('dblclick', 'tr', me.btnDblClick.bind(me));

        //xóa một bản ghi theo khóa chính
        $('#btnDelete').click(me.btnDelete.bind(me));

        //#region đóng dialog và xóa màu ở dòng click
        $('#btnclose').click(function () {
            dialogDefault.dialog('close');
            $('tr.row-click').removeClass("row-click");
        });

        $('div#m-dialog').on('dialogclose', function (event) {
            $('tr.row-click').removeClass("row-click");
        });

        //#endregion

        //#region đóng pop-up cảnh báo nhập dữ liệu không hợp lệ
        $('.cancel').click(function () {
            $('.pop-up-notification').slideUp(1000);
        })
        $('.m-cancel').click(function () {
            $('.pop-up-notification').slideUp(1000);
        })
        //#endregion

        //#region validate(kiểm tra) dữ liệu nhập vào(input[text] or [email])
        //validate dữ liệu input
        $('input[required]').blur(function () {
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống!');
                $(this).attr('validate', false);
            }
            else {
                $(this).attr('validate', true);
                $(this).removeClass('border-red');
            }
        })

        //validate dữ liệu đầu vào input email
        $('input[type="email"]').blur(function () {
            var email = $(this).val();
            var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!re.test(email)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Sai định dạng email!');
                $(this).attr('validate', false);
            } else {
                $(this).attr('validate', true);
                $(this).removeClass('border-red');
            }
        })
        //#endregion

        //sự kiến ấn nút lưu
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

    }
    /**======================================
    * Hàm chức năng load lại dữ liệu trên trang
    * Created by mvthanh (26/12/2020)
    * */
    btnRefresh() {
        var me = this;
        try {
            me.loadData();
        }
        catch (e) {
            console.log(e);
        }
    }

    /**======================================
     * Hàm chức năng load dữ liệu
     * Created by mvthanh (26/12/2020)
     * */
    loadData() {
        var me = this;
        try {
            //xóa sạch dữ liệu lúc trước
            $('table tbody tr').empty();
            $('div[api]').empty();
        
            var columns = $('#table thead th');//lấy số lượng cột th
            var getDataUrl = this.domainNV;//lấy đường dẫn dữ liệu (api lấy dữ liệu)
           

        //tìm kiếm
        if (this.filter != '') {
            $('table tbody tr').empty();
            getDataUrl = this.filter;
        }
        //phân trang
        if (this.numberPage != '') {
            $('table tbody tr').empty();
            getDataUrl = this.numberPage;
        }
        //Hiển thị icon load
        $('#load').show();
        //ajax lấy dữ liệu
        $.ajax({
            url: getDataUrl,
            method: "GET",
            async: true
        }).done(function (res) {
            
            $.each(res, function (index, obj) {
                if (res) {
                    var tr = $(`<tr></tr>`);
                    if (me.tableName == "Employee") {
                        $(tr).data('objId', obj.EmployeeId);
                    }
                    else {
                        $(tr).data('objId', obj.CustomerId);
                    }

                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var fielNames = $(th).attr('fieldName');//lấy cái để map dữ liệu vào
                        var value = obj[fielNames];//lấy thông tin dữ liệu map tương ứng
                        var formatType = $(th).attr('formatType');//lấy dữ liệu để map format date
                        switch (formatType) {
                            case "d/m/y":
                                value = formatDate(value);
                                td = $(`<td class="text-center"></td>`);
                                break;
                            case "money":
                                value = formatMoney(value);
                                td = $(`<td class="text-right"></td>`);
                                break;
                            case "address":
                                td = $(`<td class="address" title="${value}"></td>`);
                                break;
                            default:
                                break;
                        }
                        td.append(value);
                        tr.append(td);

                    })
                }
                $('table tbody').append(tr);
                //ẩn icoin load
                $('#load').hide();
            })
            
        }).fail(function (res) {
            //ẩn icoin load
            $('#load').hide();
        })
            this.filter = '';
            this.numberPage = '';
            //thực hiện load dữ liệu select box
            loadCombobox(this.departmentGroup);
            loadCombobox(this.positionGroup);
        }
        catch (e) {
            console.log(e);
        }
    }
    /**======================================
    * Hàm chức năng phân trang
    * Created by mvthanh (19/01/2021)
    * */
    pagination() {
       
        $.ajax({
            url: "/api/v1/Customers/count",
            method: "GET"
        }).done(function (res) {
            BaseJs.numberInfor=res;
            BaseJs.n = Math.ceil(res / 10);
            updateNumberPage(1, BaseJs.n);
        }).fail(function (res) {
            console.log(res);
        })
    }


    /**======================================
    * Hàm chức năng khi ấn button thêm mới
    * Created by mvthanh (26/12/2020)
    * */
    btnAddOnClick() {

        $('#DateOfBirth').datepicker();
        $('#JoinDate').datepicker();
        $('#LevelDate').datepicker();

        var me = this;
        try {
            me.formMethod = "Add";
            //hiển thị dialog thêm thông tin
            dialogDefault.dialog('open');
            $('input:not(input[type="radio"])').val(null);
            $('#btnDelete').addClass("m-hide");
            //load dữ liệu select box
            var select = $('select#CustomerGroupName');
            select.empty();
            
            $('#load').show();
            $.ajax({
                url: "/api/v1/customergroups",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, value) {
                        var option = $(`<option value="${value.CustomerGroupId}">${value.CustomerGroupName}</option>`);
                        select.append(option);
                    })
                }
                $('#load').hide();
            }).fail(function (res) {
                $('#load').hide();
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    /**======================================
    * Hàm chức năng khi ấn button lưu
    * Created by mvthanh (26/12/2020)
    * */
    btnSaveOnClick() {
        var me = this;
        try {
            //validate dữ liệu
            var inputValues = $('input[type="email"],input[required]');
            //trigger kích hoạt 1 sự kiện gì của chính thằng đấy(tự động bật)
            $.each(inputValues, function (index, input) {
                $(input).trigger('blur');
            })
            debugger;
            var notValue = $('input[validate="false"]');
            if (notValue && notValue.length > 0) {
                notValue[0].focus();
                $('.pop-up-notification').fadeIn(1000);
                return;
            }
            //thu thập thông tin dữ liệu được nhập ->built thành objJson
            var objCustomers = {};
            var inputs = $('input[valueName],select[valueName]');//select tất cả các thẻ input
            $.each(inputs, function (index, value) {
                
                var propertieName = $(this).attr('valueName');
                var valueCustomer = $(this).val();
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        objCustomers[propertieName] = valueCustomer;
                    }
                }
                else {
                    objCustomers[propertieName] = valueCustomer;
                }

            })

            var method = "POST";
            var url = me.domainNV;
            if (me.formMethod == "Edit") {
                method = "PUT";
                objCustomers.CustomerId = me.objId;
                url = url + "/" + me.objId;
            }
            //gọi service thực hiện lưu
            $.ajax({
                url: url,
                method: method,
                data: JSON.stringify(objCustomers),
                contentType: "application/json"
            }).done(function (res) {
                if (res) {
                    debugger;
                    $('#success').removeClass("m-hide");
                    $('#success').fadeIn(1000);
                    $('#success').delay(1000).slideUp(1000);
                    dialogDefault.dialog('close');
                    $('table tbody tr').empty();
                    me.loadData();
                }
            }).fail(function (res) {
                $('#error').fadeIn(1000);
                $('#error').delay(1000).slideUp(1000);
                console.log(res);
            })

            //lưu ->đưa ra thông báo -> ẩn form -> load lại dl
        }
        catch (e) {
            console.log(e);
        }
    }

    /**======================================
   * Hàm chức năng hiển thị thông tin chi tiết khi nhấn đúp chuột vô 1 bản ghi
   * Created by mvthanh (26/12/2020)
   * */
    btnDblClick(e) {
        var me = this;
        try {
           
            //bôi màu vào dòng ấn
            $(e.currentTarget).addClass("row-click");
            //hiển thị nút xóa
            $('#btnDelete').removeClass("m-hide");
            //load dữ liệu form
            
            me.formMethod = "Edit";
            //lấy khóa chính của bản ghi
            var objId = $(e.currentTarget).data('objId');
            me.objId = objId;
            //gọi service lấy obj
            $.ajax({
                url: me.domainNV + `/${objId}`,
                method: "GET"
            }).done(function (res) {

                //hiển thị dữ liệu lên form chi tiết
                var inputs = $('input[valueName],select[valueName]');//select tất cả các thẻ input
                var radioGender = $("[name='radio']");
               
                $.each(inputs, function (index, value) {
                    var propertieName = $(this).attr('valueName');
                    var datetimes = $(this).attr('format');//;lấy các thẻ cần format date
                    var money = $(this).attr('formatMoney');//lấy các thẻ cần format money
                    var combobox = $(this).attr('name');//lấy các thẻ cần hiển thị combobox
                    debugger;
                    
                    var value = res[propertieName];
                    //hiển thị dữ liệu lên datetime
                    if (datetimes) {
                        value = formatDate(res[propertieName]);
                    }
                    //hiển thị dữ liệu money
                    if (money) {
                        value = formatMoney(res[propertieName]);
                    }

                    //if (propertieName == "DateOfBirth" ) {
                    //    value = formatDate(res[propertieName]);//hiển thị dữ liệu lên text datetime
                    //}

                    //hiển thị dữ liệu lên combobox
                    if (combobox == "combobox") {
                        value = res[propertieName];
                    }

                    //hiển thị dữ liệu giới tính
                    if (radioGender.length > 0) {
                        if (propertieName == "Gender") {
                            if (res[propertieName] == "1") {
                                $('input[title="nữ"]').prop('checked', false);
                                $('input[title="nam"]').prop('checked', true);
                            }
                            else if (res[propertieName] == "0") {
                                $('input[title="nam"]').prop('checked', false);
                                $('input[title="nữ"]').prop('checked', true);

                            }
                            else if (res[propertieName] != "0" && res[propertieName] != "1") {
                                $('input[title="nam"]').prop('checked', false);
                                $('input[title="nữ"]').prop('checked', false);
                                $('input[title="khác"]').prop('checked', true);
                            }
                        }
                    }
                   
                    
                    $(this).val(value);
                })
                $('input[title="nam"]').val("1");
                $('input[title="nữ"]').val("0");
                $('input[title="khác"]').val("2");
            }).fail(function (res) {
                console.log(res);
            })
            dialogDefault.dialog('open');
        }
        catch (e) {
            console.log(e);
        }
    }

    /**======================================
    * Hàm thực hiện chức năng xóa một bản ghi theo khóa chính của bản ghi đó
    * Created by mvthanh (12/01/2021)
    * */
    btnDelete() {
        var me = this;
        try {
            //thực hiện xóa
            $.ajax({
                url: me.domainNV + "/" + me.objId,
                method: "Delete"
            }).done(function (res) {
                //đóng dialog
                dialogDefault.dialog('close');
                $('tr.row-click').removeClass("row-click");
                //load lại
                $('table tbody tr').empty();
                me.loadData();
            }).fail(function (res) {
                console.log(res);
            })

        }
        catch (e) {
            console.log(e);
        }
    }
}