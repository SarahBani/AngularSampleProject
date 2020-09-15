import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBank } from '../models/Ibank.model';

@Injectable({ providedIn: 'root' })
export class BankService {

  saveCompleted = new EventEmitter();
  private headers: HttpHeaders;
  private baseUrl: string;
  public currentBank: IBank;
  public banks: IBank[];
  public count: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getItem(id: number) {
    this.http.get<IBank>(this.baseUrl + 'bank/ItemAsync/' + id, { headers: this.headers })
      .subscribe(result => {
        this.currentBank = result;
      }, error => console.error(error));
  }

  getList() {
    this.http.get<IBank[]>(this.baseUrl + 'bank/ListAsync', { headers: this.headers })
      .subscribe(result => {
        this.banks = result;
      }, error => console.error(error));
  }

  getCount() {
    this.http.get<number>(this.baseUrl + 'bank/CountAsync', { headers: this.headers })
      .subscribe(result => {
        this.count = result;
      }, error => console.error(error));
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
