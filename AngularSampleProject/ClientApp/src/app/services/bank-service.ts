import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IBank } from '../models/Ibank.model';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICustomActionResult } from '../models/ICustomActionResult.model';

@Injectable({ providedIn: 'root' })
export class BankService {

  private headers: HttpHeaders;
  public count: number;

  saveCompleted = new EventEmitter();
  selectedChanged = new Subject<IBank>();

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  select(bank: IBank): void {
    this.selectedChanged.next(bank);
  }

  getItem(id: number): Observable<IBank> {
    return this.http.get<IBank>(this.baseUrl + 'bank/ItemAsync/' + id, { headers: this.headers })
      .pipe(map((response) => {
        console.log(response);
        return response;
        //}))
        //.pipe(catchError((error: HttpErrorResponse) => {
        //  if (error.error instanceof Error) {
        //    // A client-side or network error occurred. Handle it accordingly.
        //    console.error('An error occurred:', error.error.message);
        //  } else {
        //    // The backend returned an unsuccessful response code.
        //    // The response body may contain clues as to what went wrong,
        //    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        //  }

        //  // If you want to return a new response:
        //  //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        //  // If you want to return the error on the upper level:
        //  //return throwError(error);

        //  // or just return nothing:
        //  return empty;
      }));
  }

  getList(): Observable<IBank[]> {
    return this.http.get<IBank[]>(this.baseUrl + 'bank/ListAsync', { headers: this.headers })
      .pipe(map((response: IBank[]) => {
        return response;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        //return throwError(error);

        // or just return nothing:
        return empty;
      }));
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'bank/CountAsync', { headers: this.headers });
  }

  insert(bank: IBank): void {
    this.http.post(this.baseUrl + 'bank/InsertAsync', bank, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

  update(id: number, bank: IBank): void {
    this.http.put(this.baseUrl + 'bank/UpdateAsync/' + id, bank, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

  delete(id: number): void {
    this.http.delete(this.baseUrl + 'bank/DeleteAsync/' + id, { headers: this.headers })
      .subscribe(result => {
        alert(result);
      }, error => console.error(error));
  }

}
