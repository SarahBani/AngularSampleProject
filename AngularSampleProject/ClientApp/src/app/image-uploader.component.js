"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploaderComponent = void 0;
var http_1 = require("@angular/common/http");
var ImageUploaderComponent = /** @class */ (function () {
    function ImageUploaderComponent() {
        this.fileToUpload = null;
        this.isUploading = false;
    }
    ImageUploaderComponent.prototype.ngOnInit = function () {
    };
    ImageUploaderComponent.prototype.uploadImage = function (files) {
        var _this = this;
        this.getUploadFile(files.item(0))
            .subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                _this.uploadedPercentage = Math.round(100 * event.loaded / event.total);
            }
            else if (event.type === http_1.HttpEventType.Response) {
                var actionResult = event.body;
                _this.uploadedImageUrl = actionResult.content;
            }
        }, function (error) {
            console.log(error);
        });
    };
    return ImageUploaderComponent;
}());
exports.ImageUploaderComponent = ImageUploaderComponent;
//# sourceMappingURL=image-uploader.component.js.map