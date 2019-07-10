import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseDto, ExpensePostDto} from "../../model/ExpenseDto";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as moment from 'moment';
import {CurrencyService} from '../service/currency.service'
import { AmountDetails } from 'src/model/AmountDetails.interface';

// Config for datepicker
const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateExpenseComponent implements OnInit, OnChanges {
  public formGroup: FormGroup;

  // Date picker max/min
  public minDate = new Date(2000, 0, 1);
  public maxDate = new Date();

  public readonly NATURE_MAX_CHAR = 120;
  public readonly COMMENT_MAX_CHAR = 600;

  // Available currencies
  public readonly CURRENCIES :any = [
  {value: 'EUR', viewValue: 'EUR'},
  {value: 'USD', viewValue: 'USD'},
  {value: 'GBP', viewValue: 'GBP'},
  {value: 'CHF', viewValue: 'CHF'}
];

  // 2 digits after comma
  private AMOUNT_REGEXP: string = '^[0-9]+(\.?[0-9]{1,2})?$';

  /**
   * If Defined, edit specific item
   */
  @Input()
  public expenseItem: ExpenseDto;

  /**
   * Send an event on submit
   */
  @Output()
  public formSubmitted = new EventEmitter<any>();

  // Used for estimation display 
  public convertedAmount: AmountDetails;


  constructor(private formBuilder: FormBuilder, public currencyService: CurrencyService) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenseItem) {
      this.createForm(changes.expenseItem.currentValue);
    }
  }

  /**
   * Init form
   * @param expense 
   */
  public createForm(expense?: ExpenseDto) {
    const initFormExpense = {
      purchasedOn: expense ? moment(expense.purchasedOn) : null,
      nature: expense && expense.nature || null,
      comment: expense && expense.comment || null,
      amount: expense && expense.originalAmount.amount || null,
      currency: expense && expense.originalAmount.currency || null
    };
    this.formGroup = this.formBuilder.group({
      'purchasedOn': [initFormExpense.purchasedOn, [Validators.required]],
      'nature': [initFormExpense.nature, [Validators.required, Validators.maxLength(this.NATURE_MAX_CHAR)]],
      'comment': [initFormExpense.comment, [Validators.required, Validators.maxLength(this.COMMENT_MAX_CHAR)]],
      'amount': [initFormExpense.amount, [Validators.required, Validators.pattern(this.AMOUNT_REGEXP)]],
      'currency': [initFormExpense.currency, [Validators.required]]
    });
    
    this.handleCurrencySuggestion();
  }

  /**
   * If amount || currency change and other than euro, do estimation
   */
  protected handleCurrencySuggestion(): void {
    const handleCurrency = () => {
      const amount = this.formGroup.controls['amount'].value;
      const currency = this.formGroup.controls['currency'].value;
      if (this.formGroup.controls['amount'].valid
        && this.formGroup.controls['currency'].valid
        && this.formGroup.controls['currency'].value
        && this.formGroup.controls['currency'].value !== 'EUR') {
        this.currencyService.convert({amount, currency}, 'EUR').subscribe((res) => {
          this.convertedAmount = res;
        });
      } else {
        this.convertedAmount = undefined;
      }
    };
    
    this.formGroup.get('amount').valueChanges.subscribe(() => {
      handleCurrency();
    });
    this.formGroup.get('currency').valueChanges.subscribe(() => {
      handleCurrency();
    });
  }

  /**
   * Format data and send an event with the action to do (create or modify) and form data
   * @param post 
   */
  public onSubmit(post) {
    const data: ExpensePostDto = {
      purchasedOn: post.purchasedOn.format('YYYY-MM-DD'),
      nature: post.nature,
      comment: post.comment,
      originalAmount: {amount: post.amount, currency: post.currency},
      convertedAmount: this.convertedAmount || {amount: post.amount, currency: post.currency}
    };
    const mod = this.expenseItem ? "MOD" : "CRE";
    const id = this.expenseItem ? this.expenseItem.id : null;
    this.formSubmitted.emit({action: mod, data, id});
    this.clearForm();
  }

  /**
   * Reset form data and errors
   */
  private clearForm(): void {
    this.formGroup.reset();
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key).setErrors(null) ;
    });
    this.convertedAmount = undefined;
  }
}
