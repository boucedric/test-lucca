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

  @Output()
  public expenseChanged = new EventEmitter<{ id: string, action: string }>();

  public isLoading: boolean = false;

  // Paginator config
  public readonly NB_ITEM_BY_PAGE_CONF = [5, 10, 15];
  public displayedColumns: string[] = ['purchasedOn', "nature", "comment", "originalAmount", "id"];
  @Input()
  public defaultPageSize = 5;
  @Input()
  public defaultLength = 5;
  // Event to share paginator info
  @Output()
  public displayPageChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expenses.currentValue) {
      this.itemExpenses = this.expenses.items;
      this.isLoading = false;
    }
  }

  /**
   * Send modify event for specific id expense
   * @param id
   */
  public modifyItem(id) {
    this.expenseChanged.emit({id, action: "MOD"});
  }

  /**
   * Send delete event for specific id expense
   * @param id
   */
  public deleteItem(id) {
    this.expenseChanged.emit({id, action: "DEL"});
  }

  /**
   * Change loading status and share paginator event
   * @param event
   */
  public handlePageEvent(event: any) {
    this.isLoading = true;
    this.displayPageChange.emit(event);
  }
}
