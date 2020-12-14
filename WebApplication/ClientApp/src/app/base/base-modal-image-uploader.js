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
exports.BaseModalComponent = void 0;
var base_loading_component_1 = require("./base-loading.component");
var BaseModalComponent = /** @class */ (function (_super) {
    __extends(BaseModalComponent, _super);
    function BaseModalComponent(modalService, loaderService) {
        if (loaderService === void 0) { loaderService = null; }
        var _this = _super.call(this, loaderService) || this;
        _this.modalService = modalService;
        return _this;
    }
    BaseModalComponent.prototype.passResult = function (result) {
        this.modalService.passResult(result);
    };
    BaseModalComponent.prototype.onCancel = function () {
        this.modalService.passResult(null);
    };
    return BaseModalComponent;
}(base_loading_component_1.BaseLoadingComponent));
exports.BaseModalComponent = BaseModalComponent;
//# sourceMappingURL=base-modal.component.js.map