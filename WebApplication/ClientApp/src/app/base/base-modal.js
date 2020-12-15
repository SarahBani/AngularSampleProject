"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModal = void 0;
var base_loading_1 = require("./base-loading");
var BaseModal = /** @class */ (function (_super) {
    __extends(BaseModal, _super);
    function BaseModal(modalService, loaderService) {
        if (loaderService === void 0) { loaderService = null; }
        var _this = _super.call(this, loaderService) || this;
        _this.modalService = modalService;
        return _this;
    }
    BaseModal.prototype.passResult = function (result) {
        this.modalService.passResult(result);
    };
    BaseModal.prototype.onCancel = function () {
        this.modalService.passResult(null);
    };
    return BaseModal;
}(base_loading_1.BaseLoading));
exports.BaseModal = BaseModal;
//# sourceMappingURL=base-modal.js.map