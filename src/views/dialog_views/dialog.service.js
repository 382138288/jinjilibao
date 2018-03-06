app.service('DialogService', function (ngDialog) {
    /* 
        ------------错误提示框 
    */
    this.showError = function (scope) {
        ngDialog.open({
            template: '../views/dialog_views/error/error.html',
            scope: scope,
            plain: false,
            className: 'registerlogin-dialog-wrapper christmas-dialog-wrapper ngdialog-theme-default',
            showClose: false
        });
    };

    /*  */
})  