$(document).ready(function () {
    new Customer();
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

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }

    setDomainNV() {
        this.domainNV = "/customers";
    }
}