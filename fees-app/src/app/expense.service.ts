import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {Expense} from "../model/Expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly URL: string = '/api/expenseItems';
  private readonly HTTP_OPT = {headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer aec33a55366a2302f32f82199dfca32e523d1e43'
    })};

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all expenses or some expenses depending params conditions
   * @returns {Observable<Object>}
   */
  public getExpenses(params?: {offset?: number, limit?: number}) :Observable<any> {
    const opt = typeof params !== 'undefined' ? {...this.HTTP_OPT, ...params} : this.HTTP_OPT;
    return this.httpClient.get(this.URL, opt)
  }

  /**
   * Return a specific expense
   * @param {string} id
   * @returns {Observable<any>}
   */
  public getExpense(id: string) :Observable<any> {
    return this.httpClient.get(`${this.URL}/${id}`, this.HTTP_OPT)
  }

  /**
   * Add a new expense to dataBase
   * @param {Expense} expense
   * @returns {Observable<Object>}
   */
  public createExpense(expense: Expense) {
    return this.httpClient.post(this.URL, expense, this.HTTP_OPT)
  }

  /**
   * Modify a specific expense
   * @param {string} id
   * @param body
   * @returns {Observable<Object>}
   */
  public modifyExpense(id: string, body: any) {
    return this.httpClient.put(`${this.URL}/${id}`, body, this.HTTP_OPT)
  }

  /**
   * Remove an expense
   * @param {string} id
   * @returns {Observable<Object>}
   */
  public removeExpense(id:string) {
    return this.httpClient.delete(`${this.URL}/${id}`, this.HTTP_OPT)
  }
}
