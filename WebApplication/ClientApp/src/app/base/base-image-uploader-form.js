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
exports.ImageUploaderComponent = void 0;
var http_1 = require("@angular/common/http");
var base_form_component_1 = require("./base-form.component");
var ImageUploaderComponent = /** @class */ (function (_super) {
    __extends(ImageUploaderComponent, _super);
    function ImageUploaderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fileToUpload = null;
        return _this;
    }
    ImageUploaderComponent.prototype.ngOnInit = function () {
    };
    ImageUploaderComponent.prototype.uploadImage = function (files) {
        var _this = this;
        if (files.length == 0) {
            return;
        }
        this.getUploadFile(files.item(0))
            .subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                _this.uploadedPercentage = Math.round(100 * event.loaded / event.total);
                console.log(_this.uploadedPercentage);
            }
            else if (event.type === http_1.HttpEventType.Response) {
                var actionResult = event.body;
                _this.uploadedImageUrl = actionResult.content;
            }
        }, function (error) { return _super.prototype.showError.call(_this, error); });
    };
    ImageUploaderComponent.prototype.onDeleteImage = function () {
        this.uploadedImageUrl = null;
        this.uploadedPercentage = null;
    };
    return ImageUploaderComponent;
}(base_form_component_1.BaseFormComponent));
exports.ImageUploaderComponent = ImageUploaderComponent;
//# sourceMappingURL=image-uploader.component.js.map