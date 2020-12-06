"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLoadingComponent = void 0;
// TODO: Add Angular decorator.
var BaseLoadingComponent = /** @class */ (function () {
    function BaseLoadingComponent(loaderService) {
        var _this = this;
        if (loaderService === void 0) { loaderService = null; }
        this.isLoading = false;
        this.counter = 0;
        if (loaderService != null) {
            // this constructor is useful for components which have delete button
            // loader appears not after pressing delete button
            // but after confirm delete
            this.changeLoaderStatusSubscription = loaderService.changeLoaderStatus
                .subscribe(function (status) {
                if (status) {
                    _this.showLoader();
                }
                else {
                    _this.hideLoader();
                }
            });
        }
    }
    BaseLoadingComponent.prototype.showLoader = function () {
        this.isLoading = true;
        this.counter++;
    };
    BaseLoadingComponent.prototype.hideLoader = function () {
        if (this.counter > 0) {
            this.counter--;
        }
        if (this.counter == 0) {
            this.isLoading = false;
        }
    };
    BaseLoadingComponent.prototype.showError = function (error) {
        console.warn('BaseLoadingComponent - showError');
        var JsonErr = JSON.stringify(error);
        console.error(JsonErr);
        this.hideLoader();
    };
    BaseLoadingComponent.prototype.ngOnDestroy = function () {
        if (this.changeLoaderStatusSubscription != null) {
            this.changeLoaderStatusSubscription.unsubscribe();
        }
    };
    return BaseLoadingComponent;
}());
exports.BaseLoadingComponent = BaseLoadingComponent;
//# sourceMappingURL=base-loading.component.js.map