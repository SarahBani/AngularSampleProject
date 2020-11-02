"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModalComponent = void 0;
var BaseModalComponent = /** @class */ (function () {
    function BaseModalComponent(modalService) {
        this.modalService = modalService;
    }
    BaseModalComponent.prototype.passResult = function (result) {
        this.modalService.passResult(result);
    };
    BaseModalComponent.prototype.onCancel = function () {
        this.modalService.passResult(null);
    };
    return BaseModalComponent;
}());
exports.BaseModalComponent = BaseModalComponent;
//# sourceMappingURL=base-modal.component.js.map