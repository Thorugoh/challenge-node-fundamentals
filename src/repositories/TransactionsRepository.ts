import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(transactions => transactions.type == "income");
    const income = incomeTransactions.reduce((income, transaction) => income += transaction.value, 0);

    const outcomeTransactions = this.transactions.filter(transactions => transactions.type == "outcome");
    const outcome = outcomeTransactions.reduce((outcome, transaction) => outcome += transaction.value, 0);

    return {income, outcome, total: income - outcome};
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
