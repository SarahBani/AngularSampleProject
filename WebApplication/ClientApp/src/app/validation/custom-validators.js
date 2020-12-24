"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidators = void 0;
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.matchValidator = function (otherControlName) {
        return function (control) {
            var _a;
            var otherControl = (_a = control.parent) === null || _a === void 0 ? void 0 : _a.get(otherControlName);
            if (control.value != (otherControl === null || otherControl === void 0 ? void 0 : otherControl.value)) {
                return ({ 'mismatch': true });
            }
            else {
                return null;
            }
        };
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
//export function gte(val: number): ValidatorFn {
//  return (control: AbstractControl): ValidationErrors | null => {
//    let v: number = +control.value;
//    if (isNaN(v)) {
//      return { 'gte': true, 'requiredValue': val }
//    }
//    if (v <= +val) {
//      return { 'gte': true, 'requiredValue': val }
//    }
//    return null;
//  }
//}
//export const matchValidator = (otherControlName: string) => {
//  return (control: FormControl) => {
//    let otherControl = control.parent?.get(otherControlName) as FormControl;
//    if (control.value != otherControl?.value) {
//      return ({ 'mismatch': true })
//    }
//    else {
//      return null;
//    }
//  };
//};
//# sourceMappingURL=custom-validators.js.map