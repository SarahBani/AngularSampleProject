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
exports.BaseFormComponent = void 0;
var base_loading_component_1 = require("./base-loading.component");
var BaseFormComponent = /** @class */ (function (_super) {
    __extends(BaseFormComponent, _super);
    function BaseFormComponent(loaderService) {
        if (loaderService === void 0) { loaderService = null; }
        var _this = _super.call(this, loaderService) || this;
        _this.changesSaved = false;
        _this.const_confirmDiscardChanges = 'Do you want to discard the changes?';
        return _this;
    }
    BaseFormComponent.prototype.canDeactivate = function () {
        if (!this.changesSaved) {
            return confirm(this.const_confirmDiscardChanges);
        }
        return this.changesSaved;
    };
    return BaseFormComponent;
}(base_loading_component_1.BaseLoadingComponent));
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=base-form.component.js.map