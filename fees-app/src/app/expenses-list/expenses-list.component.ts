import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ExpenseDto, ExpensesDto} from "../../model/ExpenseDto";

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnChanges {
  @Input()
  public expenses: ExpensesDto;

  public itemExpenses: ExpenseDto[] = [];

  public displayedColumns: string[] = ['purchasedOn', "nature", "comment", "convertedAmount.amount"];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses.currentValue) {
      this.itemExpenses = this.expenses.items;
    }
  }
}
