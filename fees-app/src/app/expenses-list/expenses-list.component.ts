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

  /**
   * Sort expenses depending direction and column (active)
   * @param event
   */
  public handleSortChange(event: { active: string, direction: string }) {
    switch (event.active) {
      case 'nature':
      case 'comment':
        // Order Alphabeticaly
        this.sortAlphaOrDigit(event);
        break;
      case 'purchasedOn':
        // Order by date
        this.sortByDate(event);
        break;
      case 'originalAmount':
        // Order by price
        this.sortAlphaOrDigit(event);
        break;
      default:
        break;
    }
  }

  /**
   * Order by Alphabetically or Number
   * @param event
   */
  private sortAlphaOrDigit(event: { active: string, direction: string }) {
    if (event.direction === '') {
      return;
    }
    if (event.direction === 'asc') {
      this.itemExpenses.sort((a, b) => {
        if (event.active === 'originalAmount') {
          return (a['originalAmount'].amount > b['originalAmount'].amount) ? 1 : ((b['originalAmount'].amount > a['originalAmount'].amount) ? -1 : 0);
        } else {
          return (a[event.active].localeCompare(b[event.active], 'fr', {ignorePunctuation: true}));
        }
      });
      this.itemExpenses = this.itemExpenses.slice();
    } else {
      // desc
      this.itemExpenses.sort((a, b) => {
        if (event.active === 'originalAmount') {
          return (a['originalAmount'].amount < b['originalAmount'].amount) ? 1 : ((b['originalAmount'].amount < a['originalAmount'].amount) ? -1 : 0);
        } else {
          return - (a[event.active].localeCompare(b[event.active], 'fr', {ignorePunctuation: true}));
        }
      });
      this.itemExpenses = this.itemExpenses.slice();
    }
  }

  /**
   * Order by date
   * @param event
   */
  private sortByDate(event: { active: string, direction: string }) {
    if (event.direction === '') {
      return;
    }
    this.itemExpenses.sort((a, b) => {
      const aDate = new Date(a.purchasedOn);
      const bDate = new Date(b.purchasedOn);
      if (event.direction === 'asc') {
        return aDate > bDate ? 1 : bDate > aDate ? -1 : 0;
      } else {
        return aDate < bDate ? 1 : bDate < aDate ? -1 : 0;
      }
    });
    this.itemExpenses = this.itemExpenses.slice();
  }

}
