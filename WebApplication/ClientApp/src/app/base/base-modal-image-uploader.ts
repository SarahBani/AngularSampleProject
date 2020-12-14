import { ILoaderService } from "../services/ILoader-service";
import { ModalService } from "../services/modal-service";
import { BaseImageUploaderForm } from "./base-image-uploader-form";

export abstract class BaseModalImageUploader extends BaseImageUploaderForm {

  constructor(private modalService: ModalService,
    loaderService: ILoaderService = null) {
    super(loaderService);
  }

  protected passResult<T>(result: T): void {
    this.modalService.passResult(result);
  }

  protected onCancel(): void {
    this.modalService.passResult(null);
  }

}
