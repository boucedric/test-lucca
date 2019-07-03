export interface ExpenseDto {
  id: string,
  purchasedOn: string,
  nature: string,
  comment: string,
  originalAmount:	{
    amount: number,
    currency: string,
  },
  convertedAmount: {
    amount: number,
    currency: string
  },
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
  originalAmount:	{
    amount: number,
    currency: string,
  },
  convertedAmount: {
    amount: number,
    currency: string
  },
}
