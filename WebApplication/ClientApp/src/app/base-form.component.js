"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFormComponent = void 0;
var BaseFormComponent = /** @class */ (function () {
    function BaseFormComponent() {
        this.changesSaved = false;
        this.const_confirmDiscardChanges = 'Do you want to discard the changes?';
    }
    BaseFormComponent.prototype.canDeactivate = function () {
        if (!this.changesSaved) {
            return confirm(this.const_confirmDiscardChanges);
        }
        return this.changesSaved;
    };
    return BaseFormComponent;
}());
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=base-form.component.js.map