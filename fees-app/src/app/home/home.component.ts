import {Component, OnInit} from '@angular/core';
import {ExpenseService, ExpensesFilter} from "../service/expense.service";
import {ExpenseDto, ExpensePostDto, ExpensesDto} from "../../model/ExpenseDto";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Default config for nb expense at init
  private readonly DEFAULT_LIMIT = '5';
  public defaultPageLength = 5;

  // List of expenses
  public expensesToDisplay: ExpensesDto;
  // specific expense
  public expenseToModify: ExpenseDto;
  //view status
  public isLoading: boolean = true;
  public hasError: boolean = false;
  public isFormDisplay: boolean = false;

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.updateExpenses();
  }

  /**
   * Get all expenses or a group of expenses and update the view
   * @param params
   */
  private updateExpenses(params?: any) {
    const queryParams: ExpensesFilter = params || {limit: this.DEFAULT_LIMIT};
    this.isLoading = true;
    this.expenseService.getExpenses(queryParams)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res: ExpensesDto) => {
          this.expensesToDisplay = res;
          this.defaultPageLength = res.count;
        },
        () => {
          this.hasError = true;
        });
  }

  /**
   * Edit or remove and expense depending action event
   * @param params
   */
  public handleExpenseChanged(params: { id: string, action: string }) {
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
      this.isFormDisplay = true;
      this.expenseToModify = this.expensesToDisplay.items.find((item) => {
        return item.id === params.id;
      });
    }
  }

  /**
   * Display form to create a new expense
   */
  public clickToAddNewExpense() {
    this.isFormDisplay = true;
    this.expenseToModify = null;
  }

  /**
   * Hide form and display expenses-list
   */
  public hideForm() {
    this.isFormDisplay = false;
  }

  /**
   * Handle events from mat-paginator and update expenses depending paginator criteria
   * @param event
   */
  public handleDisplayPage(event) {
    const params: ExpensesFilter = {
      offset: event.pageIndex * event.pageSize, // jump to x element
      limit: event.pageSize // limit number of result
    };
    this.updateExpenses(params);
  }

  /**
   * Handle submit info event for a new expense or editing specific expense
   * @param params
   */
  public handleFormExpense(params: { action: string, data: any, id?: string }) {
    this.isFormDisplay = false;
    if (params.action === "CRE") {
      this.expenseService.createExpense(params.data)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(
        () => {
          this.updateExpenses();
        },
        () => {
          this.hasError = true;
        });
    }
    if (params.action === "MOD" && params.id) {
      this.expenseService.modifyExpense(params.id, params.data)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(
        () => {
          this.updateExpenses();
        },
        () => {
          this.hasError = true;
        });
    }
  }
}
