import {Component, Input, OnInit} from '@angular/core';
import {ExpensesDto} from "../../model/ExpenseDto";

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  @Input()
  public expenses: ExpensesDto;

  constructor() { }

  ngOnInit() {
  }

}
