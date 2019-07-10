import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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

  public displayedColumns: string[] = ['purchasedOn', "nature", "comment", "originalAmount", "id"];
  constructor() { }

  @Output()
  public expenseChanged = new EventEmitter<{id: string, action: string}>();

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses.currentValue) {
      this.itemExpenses = this.expenses.items;
    }
  }

  public modifyItem(id) {
    this.expenseChanged.emit({id, action: "MOD"});
  }

  public deleteItem(id) {
    this.expenseChanged.emit({id, action: "DEL"});
  }
}
