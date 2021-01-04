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
function formatYYMMDD(date) {
    var d = new Date(date),
        day = '' + d.getDate(),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}