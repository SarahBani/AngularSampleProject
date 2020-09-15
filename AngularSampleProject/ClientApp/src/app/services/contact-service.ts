import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IContact } from '../models/IContact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
    sentCompleted = new EventEmitter();
    private headers: HttpHeaders;
    private baseUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }

    send(email: string, message: string): void {
        var contact: IContact = { email: email, message: message };
        this.http.post(this.baseUrl + 'Contact/SendAsync', contact, { headers: this.headers, responseType: 'text'})
            //.toPromise()
            //.map(res => res.json().data )
            //.map((res: Response) => {
            //    return res;
            //})
            .pipe(map(res => { console.log(res); return res; }))
            //.pipe(
            //    tap(result => {
            //        //this code is not executed, I do not understand why                
            //        console.log(result);
            //        return result;
            //    })
            //)
            .subscribe(result => {
                alert(result);
                //this.sentCompleted.emit();
            }, error => console.error(error));
    }

}
