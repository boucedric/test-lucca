import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseDto, ExpensePostDto} from "../../model/ExpenseDto";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as moment from 'moment';



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

  // Available currencies
  public readonly CURRENCIES :any = [
  {value: 'EUR', viewValue: 'EUR'},
  {value: 'USD', viewValue: 'USD'},
  {value: 'GBP', viewValue: 'GBP'},
  {value: 'CHF', viewValue: 'CHF'}
];

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


  constructor(private formBuilder: FormBuilder) { }

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
    if (expense) {
      this.formGroup = this.formBuilder.group({
        'purchasedOn': [moment(expense.purchasedOn), [Validators.required]],
        'nature': [expense.nature, Validators.required],
        'comment': [expense.comment, [Validators.required]],
        'amount': [expense.originalAmount.amount, [Validators.required]],
        'currency': [expense.originalAmount.currency, [Validators.required]]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        'purchasedOn': [null, [Validators.required]],
        'nature': [null, Validators.required],
        'comment': [null, [Validators.required]],
        'amount': [null, [Validators.required]],
        'currency': [null, [Validators.required]]
      });
    }
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
      convertedAmount: this.getConvertedAmount(post.amount, post.currency)
    };
    const mod = this.expenseItem ? "MOD" : "CRE";
    console.log("onSubmit this.expenseItem", this.expenseItem);

    console.log("onSubmit", mod);

    const id = this.expenseItem ? this.expenseItem.id : null;
    this.formSubmitted.emit({action: mod, data, id});
  }

  public getConvertedAmount(originalAmount, currency) {
    // TODO call api
    return {amount: originalAmount, currency: 'EUR'}
  }
}
