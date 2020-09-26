import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICustomActionResult } from '../models/ICustomActionResult.model';
import { ModalService } from './modal-service';
import { ExceptionHandlerService } from './exception-handler-service';

export abstract class BaseService {

  protected headers: HttpHeaders;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private modalService: ModalService,
    private exceptionHandlerService: ExceptionHandlerService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
  }

  private getHeaders(): {
    headers?: HttpHeaders; responseType: 'json';
  } {
    return {
      headers: this.headers,
      responseType: 'json'
    };
  }

  protected post<T>(url: string,
    body: T,
    successMessage: string,
    postCompleted: Subject<any>): void {
    this.http.post<ICustomActionResult>(this.baseUrl + url, body, this.getHeaders())
      //.toPromise()
      //.map(res => res.json().data )
      .pipe(map((response: ICustomActionResult) => {
        return response;
      }))
      .subscribe(result => {
        if (result.isSuccessful) {
          this.modalService.showSuccess(successMessage);
        }
        postCompleted.next();
      }, response => {
        this.exceptionHandlerService.showModalException(response);
      });
  }

}
