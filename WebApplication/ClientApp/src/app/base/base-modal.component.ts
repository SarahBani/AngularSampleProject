import { ILoaderService } from "../services/ILoader-service";
import { ModalService } from "../services/modal-service";
import { BaseLoadingComponent } from "./base-loading.component";

export abstract class BaseModalComponent extends BaseLoadingComponent {

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
