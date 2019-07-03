import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../expense.service";
import {ExpensesDto} from "../../model/ExpenseDto";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly DEFAULT_LIMIT = '2';

  public expensesToDisplay: ExpensesDto;

  public isLoading: boolean = true;

  public hasError: boolean = false;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.updateExpenses();
  }

  private updateExpenses() {
    this.isLoading = true;
    this.expenseService.getExpenses({limit: this.DEFAULT_LIMIT})
      .pipe(
        finalize(() => {
          // Your code Here
          this.isLoading = false;
        })
      )
      .subscribe(
      (res: ExpensesDto) => {
        this.expensesToDisplay = res;
      },
      () => {
        this.hasError = true;
      });
  }

  // this.expenseService.createExpense(expense).subscribe(
  //   (res) => {
  //     console.log('success', res);
  //   },
  //   (err) => {
  //     console.log('error', err);
  //   });

  // this.expenseService.modifyExpense('015ea3e4-068a-4fd0-a1ba-05a01258f002', {comment: 'lol'}).subscribe(
  //   (res) => {
  //     console.log('success', res);
  //   },
  //   (err) => {
  //     console.log('error', err);
  //   });

  // this.expenseService.removeExpense('015ea3e4-068a-4fd0-a1ba-05a01258f002').subscribe(
  //   (res) => {
  //     console.log('success', res);
  //   },
  //   (err) => {
  //     console.log('error', err);
  //   });

}
