import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpensePostDto} from "../../model/ExpenseDto";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  public formGroup: FormGroup;

  @Output()
  public formSubmitted = new EventEmitter<ExpensePostDto>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group({
      'purchasedOn': [null, [Validators.required]],
      'nature': [null, Validators.required],
      'comment': [null, [Validators.required]],
      'amount': [null, [Validators.required]],
      'currency': [null, [Validators.required]]
    });
  }

  public onSubmit(post) {
    const data: ExpensePostDto = {
      purchasedOn: post.purchasedOn,
      nature: post.nature,
      comment: post.comment,
      originalAmount: {amount: post.amount, currency: post.currency},
      convertedAmount: this.getConvertedAmount(post.amount, post.currency)
    };
    this.formSubmitted.emit(data);
  }

  public getConvertedAmount(originalAmount, currency) {
    // TODO call api
    return {amount: originalAmount, currency: 'EUR'}
  }
}
