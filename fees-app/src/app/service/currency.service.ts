import { Injectable } from '@angular/core';
import { AmountDetails } from '../../model/AmountDetails.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // Available currencies
  public readonly AVAILABLE_CURRENCIES :any = [
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'USD', viewValue: 'USD'},
    {value: 'GBP', viewValue: 'GBP'},
    {value: 'CHF', viewValue: 'CHF'}
  ];

  constructor() { }

  public convert(from: AmountDetails, toCurrency: string) : Observable<AmountDetails> {
    // TODO do API call https://mobile.ilucca-dev.net/api/expenseItems
    let fakeConvert = from.amount * Math.random();
    fakeConvert = Math.round(fakeConvert * 100) / 100
    return of({amount: fakeConvert, currency: toCurrency});
  }
}
