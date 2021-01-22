/**------------------------------------------
 * format dữ liệu ngày tháng sang ngày/tháng/năm
 * Created by mvthanh(25/12/2020)
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 */
function formatDate(date) {
    var date = new Date(date);//chuyển dữ liệu dạng json string sang datetime
    if (Number.isNaN(date.getTime())) {
        return "";
    }
    else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }
}
/**-----------------------------------------------
 * định dạng hiển thị tiền tệ
 * created by mvthanh(25/12/2020)
 * @param {any} value money số tiền
 */
function formatMoney(value) {
    if (value) {
        value = Number(value)
        var num = value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return num;
    }
    return "";

}
/**------------------------------------------
 * format dữ liệu ngày tháng năm sang năm/tháng/ngày
 * Created by mvthanh(2020/12/25)
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 */
//function formatYYMMDD(date) {
//    var d = new Date(date),
//        day = '' + d.getDate(),
//        month = '' + (d.getMonth() + 1),
//        year = d.getFullYear();

//    if (month.length < 2)
//        month = '0' + month;
//    if (day.length < 2)
//        day = '0' + day;

//    return [year, month, day].join('-');
//}
/**
 * update lại số thứ tự trang
 * Created by mvthanh(19/01/2021)
 * @param {any} i trang hiện tại
 * @param {any} n tổng số trang
 */
function updateNumberPage(i, n) {
    var j = 1;
    var numberPage = ``;
    for (i; i <= n; i++) {
        numberPage += `<div class="number_page">${i}</div>`;
        j++;
        if (j > 4) {
            break;
        }
    }
    $('.number').append(numberPage);
    $('.number_page:first').addClass("number-click");
}
/**
 * Hiển thị số bản ghi trên trang
 * CreatedBy MVThanh(19/01/2021)
 * @param {any} i số trang
 */
function viewInforPage(i) {
    $('.text_left').empty();
    console.log(BaseJs.n);
    var numberText = ``;
    if (i == BaseJs.n) {
        numberText = 'Hiển thị ' + BaseJs.numberInfor + '/' + BaseJs.numberInfor + ' Khách hàng';
    } else if (i > 1) {
        numberText = 'Hiển thị ' + ((i * 10) - 10) + '-' + (i * 10) + '/' + BaseJs.numberInfor + ' Khách hàng';
    }
    else {
        ////Hiển thị số lượng bản ghi
        numberText = `Hiển thị 1-10/1000 khách hàng`;
    }
    $('.text_left').append(numberText);
}
/**
 * hiển thị dữ liệu combobox ra màn hình
 * CreatedBy MVThanh(21/01/2021)
 * @param {any} api đường dẫn lấy dữ liệu
 */
function loadCombobox(api) {
    if (api) {

        var fieldName = $("dropdown[api='" + api + "']").attr('fieldName');
        var fieldValue = $("dropdown[api='" + api + "']").attr('valueName');
        var combobox = $(`<select valueName="${fieldName}" class="custom">
                        </select>`);
        var filterDepartmentGroup = $(`<select valueName="${fieldName}" class="custom">
                        <option value="">Tất cả phòng ban</option>
                        </select>`);
        var filterPositionGroup = $(`<select valueName="${fieldName}" class="custom">
                        <option value="">Tất cả vị trí</option>
                        </select>`);
        var select = $("div[api='" + api + "']");
        console.log(this);
        //hiển thị icon load
        $('#load').show();
        //ajax lấy dữ liệu
        $.ajax({
            url: api,
            method: "GET"
        }).done(function (res) {

            $.each(select, function (i, obj) {

                if ($(this).attr('filter') == "filterDepartmentGroup") {
                    if (res) {
                        $.each(res, function (index, value) {
                            var option = $(`<option value="${value[fieldName]}">${value[fieldValue]}</option>`);
                            filterDepartmentGroup.append(option);
                        })
                        $(this).append(filterDepartmentGroup);
                    }
                }
                else {
                    if ($(this).attr('filter') == "filterPositionGroup") {
                        if (res) {
                            $.each(res, function (index, value) {
                                var option = $(`<option value="${value[fieldName]}">${value[fieldValue]}</option>`);
                                filterPositionGroup.append(option);
                            })
                            $(this).append(filterPositionGroup);
                        }
                    }
                    else {
                        if (res) {
                            $.each(res, function (index, value) {
                                var option = $(`<option value="${value[fieldName]}">${value[fieldValue]}</option>`);
                                combobox.append(option);
                            })
                            $(this).append(combobox);
                        }
                    }
                }
            })

            $('#load').hide();
        }).fail(function (res) {
            $('#load').hide();
        })
    }
}