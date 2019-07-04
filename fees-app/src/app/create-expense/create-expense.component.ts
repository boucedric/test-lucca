import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseDto, ExpensePostDto} from "../../model/ExpenseDto";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit, OnChanges {

  public formGroup: FormGroup;

  @Input()
  public expenseItem: ExpenseDto;

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

  public createForm(expense?: ExpenseDto) {
    if (expense) {
      this.formGroup = this.formBuilder.group({
        'purchasedOn': [expense.purchasedOn, [Validators.required]],
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

  public onSubmit(post) {
    const data: ExpensePostDto = {
      purchasedOn: post.purchasedOn,
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
