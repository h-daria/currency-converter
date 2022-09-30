import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  baseCurrency = 'UAH';
  currencyJSON: any = [];
  currencies: string[] = ['USD', 'EUR']
  resultUSD: number = 0;
  resultEUR: number = 0;
  subscription!: Subscription;

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
    this.getRates();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRates() {
    this.subscription = this.dataService.getCurrencyData(this.baseCurrency)
        .subscribe( data => {
          this.currencyJSON = JSON.stringify(data);
          this.currencyJSON = JSON.parse(this.currencyJSON);
          type ObjectKey = keyof typeof this.currencyJSON.rates;
          const prop = this.currencies[0] as ObjectKey;
          const prop2 = this.currencies[1] as ObjectKey;
          this.resultUSD = 1 / this.currencyJSON.rates[prop];
          this.resultEUR = 1 / this.currencyJSON.rates[prop2];
        })
  }

}
