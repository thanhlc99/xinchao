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

    setDomainNV() {
        this.domainNV = "/api/v1/employees";
    }

    setDepartmentGroup() {
        this.departmentGroup = "/api/v1/DepartmentGroups";
    }

    setPositionGroup() {
        this.positionGroup = "/api/v1/PositionGroups";
    }

    setTableName() {
        this.tableName = "Employee";
    }
}

