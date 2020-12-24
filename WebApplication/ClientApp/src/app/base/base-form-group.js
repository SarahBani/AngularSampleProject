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
exports.BaseFormGroup = void 0;
var base_loading_1 = require("./base-loading");
var BaseFormGroup = /** @class */ (function (_super) {
    __extends(BaseFormGroup, _super);
    function BaseFormGroup(loaderService) {
        if (loaderService === void 0) { loaderService = null; }
        var _this = _super.call(this, loaderService) || this;
        _this.setFormGroup();
        return _this;
    }
    return BaseFormGroup;
}(base_loading_1.BaseLoading));
exports.BaseFormGroup = BaseFormGroup;
//# sourceMappingURL=base-form-group.js.map