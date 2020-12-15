"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLoading = void 0;
var BaseLoading = /** @class */ (function () {
    function BaseLoading(loaderService) {
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
    BaseLoading.prototype.showLoader = function () {
        this.isLoading = true;
        this.counter++;
    };
    BaseLoading.prototype.hideLoader = function () {
        if (this.counter > 0) {
            this.counter--;
        }
        if (this.counter == 0) {
            this.isLoading = false;
        }
    };
    BaseLoading.prototype.showError = function (error) {
        console.warn('BaseLoadingComponent - showError');
        var JsonErr = JSON.stringify(error);
        console.error(JsonErr);
        this.hideLoader();
    };
    BaseLoading.prototype.ngOnDestroy = function () {
        if (this.changeLoaderStatusSubscription != null) {
            this.changeLoaderStatusSubscription.unsubscribe();
        }
    };
    BaseLoading.prototype.getEmptyItemAdded = function (array, emptyItem) {
        if (array != null) {
            array = Array.prototype.slice.call(array);
            array.unshift(emptyItem);
        }
        else {
            array = [emptyItem];
        }
        return array;
    };
    return BaseLoading;
}());
exports.BaseLoading = BaseLoading;
//# sourceMappingURL=base-loading.js.map