$(document).ready(function () {
    new Employee();
})

/**
 * Class quản lý các sự kiện cho trang employee
 * created by mvthanh(26/12/2020)
 * */
class Employee extends BaseJs {
    constructor() {
        super();
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }

   
}

