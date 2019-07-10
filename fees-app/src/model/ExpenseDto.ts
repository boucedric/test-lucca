import { AmountDetails } from './AmountDetails.interface';

export interface ExpenseDto {
  id: string,
  purchasedOn: string,
  nature: string,
  comment: string,
  originalAmount:	AmountDetails,
  convertedAmount: AmountDetails,
  createdAt: string,
  lastModifiedAt: string
}

export interface ExpensesDto {
  count: number,
  items: ExpenseDto[]
}

export interface ExpensePostDto {
  purchasedOn: string,
  nature: string,
  comment: string,
  originalAmount:	AmountDetails,
  convertedAmount: AmountDetails,
}
