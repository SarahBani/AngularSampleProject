"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
var rxjs_1 = require("rxjs");
var BaseService = /** @class */ (function () {
    function BaseService(modalService, exceptionHandlerService) {
        this.modalService = modalService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.const_confirmDelete = "Are you sure to delete this item?";
        this.onUploadFinished = new rxjs_1.Subject();
        this.operationCompleted = new rxjs_1.Subject();
    }
    BaseService.prototype.confirmDelete = function () {
        return this.modalService.showConfirm(this.const_confirmDelete);
    };
    BaseService.prototype.onSuccess = function (result) {
        if (result.isSuccessful) {
            this.operationCompleted.next(true);
        }
        else {
            this.operationCompleted.next(false);
            this.modalService.showError(result.customExceptionMessage);
        }
    };
    BaseService.prototype.onError = function (error) {
        this.showError(error);
        this.operationCompleted.next(false);
    };
    BaseService.prototype.showError = function (error) {
        console.warn('showError');
        console.error(error);
        this.exceptionHandlerService.showModalException(error);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base-service.js.map