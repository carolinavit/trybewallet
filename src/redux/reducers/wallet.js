// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { ADD_EXPENSE, SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
  currentCurrency: 'BRL',
  currencies: [],
  expenses: [],
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES: {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  case ADD_EXPENSE: {
    const id = state.expenses.length;
    const newExpenses = [...state.expenses];
    const expenseToAdd = action.expense;
    expenseToAdd.id = id;
    newExpenses.push(expenseToAdd);

    const { ask } = expenseToAdd.exchangeRates[expenseToAdd.currency];

    const expenseValue = Number(expenseToAdd.value) * Number(ask);
    const newTotal = state.totalExpenses + expenseValue;

    return {
      ...state,
      expenses: newExpenses,
      totalExpenses: newTotal,
    };
  }
  default:
    return state;
  }
};

export default wallet;
