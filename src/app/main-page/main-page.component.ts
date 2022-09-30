import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  amount1: string = '';
  amount2: string = '';
  currencies = ['UAH', 'USD', 'EUR'];
  selectedCurrency1: string = 'UAH';
  selectedCurrency2: string = 'USD';
  currencyJSON: any = [];
  result: string = '';
  convertedResult: string = '';
  subscription!: Subscription;

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
    this.getRates();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectCurrency1(currencyName: string) {
    this.selectedCurrency1 = currencyName;
    this.amount1 = '';
    this.amount2 = '';
    this.getRates(); 
  }

  selectCurrency2(currencyName: string) {
    this.selectedCurrency2 = currencyName;
    this.amount1 = '';
    this.amount2 = '';
    this.getRates();
  }

  getRates() {
    this.subscription = this.dataService.getCurrencyData(this.selectedCurrency1)
        .subscribe( data => {
          this.currencyJSON = JSON.stringify(data);
          this.currencyJSON = JSON.parse(this.currencyJSON);
          type ObjectKey = keyof typeof this.currencyJSON.rates;
          const prop = this.selectedCurrency2 as ObjectKey;
          this.result = this.currencyJSON.rates[prop];
        })
  }

  convertAmount1(event: any) {
    let amount = event.target.value /  Number(this.result);
    this.amount1 = amount.toFixed(2);
  }

  convertAmount2(event: any) {
    let amount = event.target.value * Number(this.result);
    this.amount2 = amount.toFixed(2);
  }

}
