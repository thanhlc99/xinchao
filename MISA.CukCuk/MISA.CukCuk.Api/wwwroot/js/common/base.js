/**
 * Hàm cha của employee và customer
 * created by mvthanh(26/12/2020)
 * */
class BaseJs {
    constructor() {

        /**
         * api load dữ liệu trang
         * */
        this.domainNV = '';
        /**
         * api load dữ liệu tìm kiếm
         * */
        this.filter = '';
        /**
         * api load dữ liệu số trang
         * */
        this.numberPage = '';

        /**
         * load tên trang truy cập
         * */
        this.tableName = "";


        /*====================*/
        this.setDomainNV();
        this.setFilter();
        this.setTableName();
        this.setNumberPage();
        //thực hiện việc load dữ liệu ra
        this.loadData();
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
    * Hàm xét api lấy tổng số bản ghi trong csdl
    * Created by mvthanh (22/01/2021)
    **/
    setPageCount() {

    }
    /**======================================
    * Hàm xét đường dẫn số trang
    * Created by mvthanh (19/01/2021)
    **/
    setNumberPage() {

    }


    /**
    *Hàm xét tên để lấy obj.entityId
    * Created by mvthanh (21/01/2021)
    * */
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
        });

        //$('input[required]').mouseover(function () {
        //    var x = $(this).attr('class');
        //    if (x) {
        //        var msg = `<div class="message">
        //                    Trường này không được để trống!
        //                </div>`;
        //        $('#message').append(msg);
        //    }
        //});
        //$('input[required]').mouseout(function () {
        //    $('#message').empty();
        //});

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
        });

        //#endregion

        //sự kiến ấn nút lưu
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        //thực hiện hiển thị dd/mm/yyyy
        //$('input[format="dd/mm/yyyy"]').change(function () {
        //    var value = $(this).val();
        //    value = formatDate(value);
        //    $(this).val(value);
        //});

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
            //làm rỗng đường dẫn lấy dữ liệu phân trang và tìm kiếm
            this.filter = '';
            this.numberPage = '';
        }
        catch (e) {
            console.log(e);
        }
    }



    /**======================================
    * Hàm chức năng khi ấn button thêm mới
    * Created by mvthanh (26/12/2020)
    * */
    btnAddOnClick() {
        var me = this;
        try {
            me.formMethod = "Add";
            //hiển thị dialog thêm thông tin
            dialogDefault.dialog('open');
            $('input:not(input[type="radio"])').val(null);
            $('#btnDelete').addClass("m-hide");

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
            var notValue = $('input[validate="false"]');
            if (notValue && notValue.length > 0) {
                notValue[0].focus();
                $('.pop-up-notification').fadeIn(1000);
                return;
            }
            //thu thập thông tin dữ liệu được nhập ->built thành objJson
            var objEntity = {};
            var inputs = $('input[valueName],select[valueName]');//select tất cả các thẻ input
            $.each(inputs, function (index, value) {

                var propertieName = $(this).attr('valueName');
                var valueEntity = $(this).val();
                //chuyển đổi cho đúng kiểu dữ liệu trước khi gửi đi
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        objEntity[propertieName] = valueEntity;
                    }
                }
                else {
                    if ($(this).attr('formatMoney') == "vnd") {
                        //chuyển từ string sang number
                        objEntity[propertieName] = formatNumber(valueEntity);
                    }
                    else {
                        
                        //if ($(this).attr('format') == "dd/mm/yyyy") {
                        //    objEntity[propertieName] = toDate(valueEntity);
                        //}
                        //else {
                            objEntity[propertieName] = valueEntity;
                        //}
                    }
                }
            })
            
            var method = "POST";
            var url = me.domainNV;
            if (me.formMethod == "Edit") {
                method = "PUT";
                 if (me.tableName == "Employee") {
                     objEntity.EmployeeId = me.objId;
                }
                else {
                     objEntity.CustomerId = me.objId;
                }
                //objEntity.CustomerId = me.objId;
                url = url + "/" + me.objId;
            }
            //gọi service thực hiện lưu
            $.ajax({
                url: url,
                method: method,
                data: JSON.stringify(objEntity),
                contentType: "application/json"
            }).done(function (res) {
                //console.log(res[Object.keys(res)[1]]);
                if (res) {
                    //đưa ra thông báo thành công
                    toast({
                        message: res[Object.keys(res)[1]],
                        type: 'success',
                        duration: 3000
                    })
                    //đóng dialog
                    dialogDefault.dialog('close');
                    //load lại dữ liệu
                    me.loadData();
                }
            }).fail(function (res) {
                console.log(res);
                //thông báo lỗi nếu ở phía server
                if (res.responseJSON.MISACode == 500) {
                    toast({
                        message: res.responseJSON.Messenger,
                        type: 'error',
                        duration: 3000
                    });
                }
                else {
                    //đưa ra thông báo lỗi trùng dữ liệu, quá kích thước cho phép
                    //console.log(res.responseJSON.Data[0]);
                    toast({
                        message: res.responseJSON.Data[0],
                        type: 'warning',
                        duration: 3000
                    });
                }
            })
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

                    var value = res[propertieName];
                    
                    //hiển thị dữ liệu lên datetime
                    if (datetimes) {
                        value = formatYYMMDD(res[propertieName]);
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
            //Hiển thị dialog xác nhận xóa
            var dialogPopUp = $('#pop-up-notification').dialog({
                autoOpen: false,
                fluid: true,
                minWidth: 390,
                resizable: true,
                position: ({
                    my: "center", at: "center", of: window
                }),
                modal: true
            });
            dialogPopUp.dialog('open');
            var htmlPop = ` <div class="pop-up-content">
                <div class="pop-up-icon"></div>
                <div class="content_not">Bạn có chắc chắn muốn xóa!</div>
            </div>
            <div class="header_not">
                <button class="pop-up-delete btn-pop" id="btnPopDelete">
                  <div>Xóa</div>
                </button>
                <button class="pop-up-cancel btn-pop" id="btnPopCancel">
                    <div>Hủy</div>
                </button>
            </div>`;
            $('#pop-up-notification').append(htmlPop);
            //kích nút hủy
            $('#btnPopCancel').click(function () {
                dialogPopUp.dialog('close');
                $('#pop-up-notification').empty();
            });

            $('button[title="Close"]').click(function () {
                $('#pop-up-notification').empty();
            });
            //kích nút xóa
            $('#btnPopDelete').click(function () {
                ////thực hiện xóa
                $.ajax({
                    url: me.domainNV + "/" + me.objId,
                    method: "Delete"
                }).done(function (res) {
                    //đóng dialog
                    dialogDefault.dialog('close');
                    dialogPopUp.dialog('close');
                    //xóa bỏ màu ở dòng ấn vô
                    $('tr.row-click').removeClass("row-click");
                    //đưa ra thông báo thành công
                    toast({
                        message: res[Object.keys(res)[1]],
                        type: 'success',
                        duration: 3000
                    });
                    //load lại
                    $('#pop-up-notification').empty();
                    viewInforPage(1, 'nhân viên');
                    me.loadData();
                }).fail(function (res) {
                    console.log(res);
                    //thông báo lỗi nếu ở phía server
                    if (res.responseJSON.MISACode == 500) {
                        toast({
                            message: res.responseJSON.Messenger,
                            type: 'error',
                            duration: 3000
                        });
                    }
                })
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}