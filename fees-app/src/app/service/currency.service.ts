import { Injectable } from '@angular/core';
import { AmountDetails } from '../../model/AmountDetails.interface';

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

  public convert(from: AmountDetails, toCurrency: string) :AmountDetails {
    return {amount: from.amount, currency: from.currency};
  }
}
