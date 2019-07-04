import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../expense.service";
import {ExpenseDto, ExpensePostDto, ExpensesDto} from "../../model/ExpenseDto";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly DEFAULT_LIMIT = '5';

  public expensesToDisplay: ExpensesDto;

  public expenseToModify: ExpenseDto;

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

  public handleExpenseChanged(params: {id: string, action: string}){
    if (params.action === "DEL") {
      this.expenseService.removeExpense(params.id).subscribe(
        () => {
          this.updateExpenses();
        },
        (err) => {
          this.hasError = true;
        });
    }
    if (params.action === "MOD") {
      this.expenseToModify = this.expensesToDisplay.items.find((item) => {
        return item.id === params.id;
      });
    }
  }

  public clickToAddNewExpense() {
    this.expenseToModify = null;
  }

  public handleFormExpense(params: {action: string, data: any, id?: string}) {
    if (params.action === "CRE") {
      this.expenseService.createExpense(params.data).subscribe(
        (res) => {
          this.updateExpenses();
        },
        (err) => {
          this.hasError = true;
        });
    }
    if (params.action = "MOD") {
      this.expenseService.modifyExpense(params.id, params.data).subscribe(
        (res) => {
          this.updateExpenses();
        },
        (err) => {
          this.hasError = true;
        });
    }
  }
}
