/**------------------------------------------
 * format dữ liệu (ngày tháng) sang chuỗi ngày/tháng/năm (string)
 * Created by mvthanh(25/12/2020)
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 */
function formatDate(date) {
    if (date) {
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
/**
 * Định dạng số cho tiền tệ nhập vào
 * CreateBy mvThanh (22/01/2021)
 * @param {any} value chuổi string tiền tệ
 */
function formatNumber(value) {
    if (value) {
        var num = parseFloat(value.replace(/\s/g, "").replace(".", ""));
        return num;
    }
}
/**
 * format dữ liệu ngày/tháng/năm sang date
 * Created by mvthanh(22/01/2021)
 * @param {any} selector kiểu dữ liệu bất kỳ
 */
function toDate(selector) {
    if (selector) {
        var from = selector.split("/")
        return new Date(from[1] - 1,from[2], from[0])
    }
}
/**------------------------------------------
 * format dữ liệu ngày tháng năm sang năm/tháng/ngày
 * Created by mvthanh(2020/12/25)
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 */
function formatYYMMDD(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return year + '-' + month + '-' + day;
    }
}
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
 * @param {any} name text hiển thị kèm
 */
function viewInforPage(i, name) {
    $('.text_left').empty();
    var numberText = ``;
    if (i == BaseJs.n) {
        numberText = 'Hiển thị ' + BaseJs.numberInfor + '/' + BaseJs.numberInfor + ' ' + name;
    } else if (i > 1) {
        numberText = 'Hiển thị ' + ((i * 10) - 10) + '-' + (i * 10) + '/' + BaseJs.numberInfor + ' ' + name;
    }
    else {
        ////Hiển thị số lượng bản ghi
        numberText = `Hiển thị 1-10/` + BaseJs.numberInfor + ' ' + name;
    }
    $('.text_left').append(numberText);
}
/**
 *  hiển thị toast messager (thông báo)
 * CreatedBy MVThanh(23/01/2021)
 * @param {any} message: một lời nhắn bất kỳ
 * @param {any} type: loại message (success,error,warning,info)
 * @param {any} duration: hiện bao nhiêu giây thì mất
 */
function toast({ message = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');
        const icons = {
            success: '/content/icon/check.svg',
            error: '/content/icon/alert-triangle.svg',
            warning: '/content/icon/info.svg',
        }
        const closes = {
            success: '/content/icon/x_blue.svg',
            error: '/content/icon/x_danger.svg',
            warning: '/content/icon/x_warging.svg',
        }

        const icon = icons[type];
        const close = closes[type];
        //xét thời gian delay
        setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);
        //xét loại thông báo
        toast.classList.add('toast', `toast--${type}`);
        //ấn nút đóng
        toast.onclick = function (e) {
            if (e.target.closest('.toast_close')) {
                main.removeChild(toast);
            }
        }
        //thời gian deleay
        const delay = (duration / 1000).toFixed(2);

        toast.style.animation = `slideInleft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `<div class="toast_icon">
                    <img style="padding-left: 3px;" src="${icon}" />
                </div>
                <div class="toast_body">
                    <div class="title_notification">${message}</div>
                </div>
                <div class="toast_close">
                    <img src="${close}" /> 
                </div>`;
        main.appendChild(toast);
    }
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
        var combobox = $(`<select tabindex="10" valueName="${fieldName}" class="custom">
                        </select>`);
        var filterDepartmentGroup = $(`<select filter="departmentId" valueName="${fieldName}" class="custom">
                        <option value="">Tất cả phòng ban</option>
                        </select>`);
        var filterPositionGroup = $(`<select filter="positionId" valueName="${fieldName}" class="custom">
                        <option value="">Tất cả vị trí</option>
                        </select>`);
        //lấy tất cả thẻ div có attrbute api = api nhập vào
        var select = $("div[api='" + api + "']");
        //hiển thị icon load
        $('#load').show();
        //ajax lấy dữ liệu
        $.ajax({
            url: api,
            method: "GET"
        }).done(function (res) {
            //lặp các thẻ select
            $.each(select, function (i, obj) {

                if ($(this).attr('filter') == "filterDepartmentGroup") {
                    if (res) {
                        //lặp dữ liệu đổ vào option
                        $.each(res, function (index, value) {
                            var option = $(`<option value="${value[fieldName]}">${value[fieldValue]}</option>`);
                            filterDepartmentGroup.append(option);
                        })
                        //đổ toàn bộ option vô thẻ select
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
            //ẩn icon load
            $('#load').hide();
        }).fail(function (res) {
            toast({
                message: res.responseJSON.Messenger,
                type: 'error',
                duration: 3000
            })
            console.log(res)
            $('#load').hide();
        })
    }
}