/**
 * Hàm cha của employee và customer
 * created by mvthanh(26/12/2020)
 * */
class BaseJs {
    constructor() {
        this.hostNV = "http://api.manhnv.net/api";
        this.domainNV = null;
        this.getDataUrl = null;
        this.setDataUrl();
        this.setDomainNV();
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
    * Hàm chứa các sự kiện trong form
    * Created by mvthanh (26/12/2020)
    **/
    setDataUrl() {

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


        $('#btnClose').click(function () {
            dialogDefault.dialog('close');
            $('tr.row-click').removeClass("row-click");
        })

        $('.cancel').click(function () {
            $('.pop-up-notification').slideUp(1000);
        })
        $('.m-cancel').click(function () {
            $('.pop-up-notification').slideUp(1000);
        })

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
            $('table tbody tr').empty();
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

        var fielNames = [];
        var columns = $('table thead th');//lấy số lượng cột th
        var getDataUrl = this.getDataUrl;
        $('#load').show();
        $.ajax({
            url: getDataUrl,
            method: "GET"
        }).done(function (res) {

            $.each(res, function (index, obj) {

                var tr = $(`<tr></tr>`);
                $(tr).data('objId', obj.CustomerId);

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
                $('table tbody').append(tr);

                $('#load').hide();
            })
        }).fail(function (res) {
            $('#load').hide();
        })
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
            $('input').val(null);
            //load dữ liệu select box
            var select = $('select#CustomerGroupName');
            select.empty();
            $('#load').show();
            $.ajax({
                url: me.hostNV + "/customergroups",
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
            if (me.formMethod == "Edit") {
                method = "PUT";
                objCustomers.CustomerId = me.objId;
                console.log(objCustomers);
            }

            //gọi service thực hiện lưu
            $.ajax({
                url: me.hostNV + me.domainNV,
                method: method,
                data: JSON.stringify(objCustomers),
                contentType: "application/json"
            }).done(function (res) {
                if (res) {
                    $('.success').fadeIn(1000);
                    $('.success').delay(1000).slideUp(1000);
                    dialogDefault.dialog('close');
                    $('table tbody tr').empty();
                    me.loadData();
                }
            }).fail(function (res) {
                $('.error').fadeIn(1000);
                $('.error').delay(1000).slideUp(1000);
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
    btnDblClick() {
        var me = this;
        try {
            $(this).addClass("row-click");
            //load dữ liệu form
            var select = $('select#CustomerGroupName');
            select.empty();
            $('#load').show();
            $.ajax({
                url: me.hostNV + "/customergroups",
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

            me.formMethod = "Edit";
            //lấy khóa chính của bản ghi
            var objId = $(this).data('objId');
            me.objId = objId;
            //gọi service lấy obj
            $.ajax({
                url: me.getDataUrl + `/${objId}`,
                method: "GET"
            }).done(function (res) {

                //binding dữ liệu lên form chi tiết
                var inputs = $('input[valueName],select[valueName]');//select tất cả các thẻ input
                var entity = {};
                $.each(inputs, function (index, value) {
                    var propertieName = $(this).attr('valueName');
                    var value = res[propertieName];
                    if (propertieName == "DateOfBirth") {
                        value = formatYYMMDD(res[propertieName]);
                    }
                    if (propertieName == "Gender") {
                        if (res[propertieName] == "1") {
                            $('input[title="nữ"]').prop('checked', false);
                            $('input[title="nam"]').prop('checked', true);
                        }
                        if (res[propertieName] == "0") {
                            $('input[title="nam"]').prop('checked', false);
                            $('input[title="nữ"]').prop('checked', true);
                        }
                    }
                    $(this).val(value);
                })

            }).fail(function (res) {
                console.log(res);
            })
            dialogDefault.dialog('open');
        }
        catch (e) {
            console.log(e);
        }
    }
}