import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBank } from '../models/IBank.model';

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
        var contact: { email: string, message: string } = { email: email, message: message };
        var bank: IBank = { id: 1, name: message, logoUrl: message };
        //this.http.post(this.baseUrl + 'contact/SendAsync', {
        //    email: email,
        //    message: message
        //}, { headers: this.headers })
            //this.http.post(this.baseUrl + 'contact/SendAsync', contact, { headers: this.headers })
        this.http.post(this.baseUrl + 'bank/eee', bank, { headers: this.headers })
            .subscribe(result => {
                alert(result);
                this.sentCompleted.emit();
            }, error => console.error(error));
    }

}
