import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IContact } from '../models/IContact.model';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { BaseRestService } from './base-rest-service';

@Injectable({ providedIn: 'root' })
export class ContactService extends BaseRestService {

  protected controllerName: string = 'Contact';
  private const_SuccessMessage: string = 'Your message has been sent.';

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  public send(email: string, message: string): void {
    var contact: IContact = {
      email: email,
      message: message
    };
    super.httpPost<IContact>('SendAsync', contact)
      .subscribe(result => {
        this.onSuccess(result);
      }, error => {
        this.onError(error);
      });
  }

  protected onSuccess(result): void {
    if (result.isSuccessful) {
      this.operationCompleted.next(true);
      this.modalService.showSuccess(this.const_SuccessMessage);
    }
    else {
      this.operationCompleted.next(false);
      this.modalService.showError(result.customExceptionMessage);
    }
  }

}
