import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  getCurrencyData(currency: string) {
    let url = 'https://api.exchangerate.host/latest?base=' + currency;
    return this.http.get(url);
  }
}
