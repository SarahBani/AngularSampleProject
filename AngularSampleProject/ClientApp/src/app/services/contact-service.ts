import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IContact } from '../models/IContact.model';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';
import { BaseService } from './base-service';

@Injectable({ providedIn: 'root' })
export class ContactService extends BaseService {

  messageSentCompleted: Subject<void> = new Subject();

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    modalService: ModalService,
    exceptionHandlerService: ExceptionHandlerService) {
    super(http, baseUrl, modalService, exceptionHandlerService);
  }

  send(email: string, message: string): void {
    var contact: IContact = {
      email: email,
      message: message
    };
    super.post<IContact>('Contact/SendAsync',
      contact,
      'Your message has been sent.',
       this.messageSentCompleted);
  }

}
