import { Component, OnInit } from '@angular/core';
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

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.dataService.getCurrencyData(this.baseCurrency)
        .subscribe( data => {
          this.currencyJSON = JSON.stringify(data);
          this.currencyJSON = JSON.parse(this.currencyJSON);
          type ObjectKey = keyof typeof this.currencyJSON.rates;
          const prop = this.currencies[0] as ObjectKey;
          const prop2 = this.currencies[1] as ObjectKey;
          this.resultUSD = 1 / this.currencyJSON.rates[prop];
          // this.resultUSD = this.cutInteger(this.resultUSD);
          this.resultEUR = 1 / this.currencyJSON.rates[prop2];
          // this.resultEUR = this.cutInteger(this.resultEUR);
        })
  }

  cutInteger(num: number) {
    num = Number(num.toString().slice(0, 5))
    return num;
  }

}
