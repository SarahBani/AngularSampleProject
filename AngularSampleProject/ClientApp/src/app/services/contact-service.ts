import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IContact } from '../models/IContact.model';
import { ICustomActionResult } from '../models/ICustomActionResult.model';
import { ModalService } from './modal-service';

@Injectable({ providedIn: 'root' })
export class ContactService {
  sentCompleted = new EventEmitter();
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private modalService: ModalService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  send(email: string, message: string): void {
    var contact: IContact = { email: email, message: message };
    this.http.post<ICustomActionResult>(this.baseUrl + 'Contact/SendAsync', contact, { headers: this.headers, responseType: 'json' })
      //.toPromise()
      //.map(res => res.json().data )
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }))
      .subscribe(result => {
        if (result.isSuccessful) {
          this.modalService.showSuccess('Your message has been sent.');
        }
        console.log(result);
        //this.sentCompleted.emit();
      }, error => {
        console.error(error);
          if (!error.isSuccessful) {
            this.modalService.showError(error.message);
          }
      });
  }

  displayInfo() {
  }

}
