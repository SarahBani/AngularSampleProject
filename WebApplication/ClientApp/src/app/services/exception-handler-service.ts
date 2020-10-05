import { Injectable } from "@angular/core";
import { ModalService } from './modal-service';

@Injectable({ providedIn: 'root' })
export class ExceptionHandlerService {

  constructor(private modalService: ModalService) { }

  public showModalException(response: any): void {
    this.modalService.showError(this.getExceptionMessage(response));
  }

  private getExceptionMessage(response: any): string {
    if (response.error == null) {
      return response.message;
    }
    if (response.error.isSuccessful != null && !response.error.isSuccessful) {
      const exceptionMessage: string = response.error.exceptionContentResult;
      return exceptionMessage;
    }
    if (response.error.errors != null && Object.keys(response.error.errors).length > 0) {
      const values = Object.keys(response.error.errors).map(key => response.error.errors[key]);
      var errorMessage = values.join('<br />');
      if (values.length > 1) {
        errorMessage = '<br />' + errorMessage;
      }
      return errorMessage;
    }
    console.log(response);
    return response.message;
  }

}
