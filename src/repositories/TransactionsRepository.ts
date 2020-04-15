import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const initialBalance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return {
          income: acc.income + transaction.value,
          outcome: acc.outcome,
          total: acc.total + transaction.value,
        };
      }
      return {
        income: acc.income,
        outcome: acc.outcome + transaction.value,
        total: acc.total - transaction.value,
      };
    }, initialBalance);

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
