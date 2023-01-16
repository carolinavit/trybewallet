// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  REMOVE_EXPENSE,
  SAVE_CURRENCIES,
  SET_IS_EDITING,
} from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
  currentCurrency: 'BRL',
  currencies: [],
  expenses: [],
  idToEdit: 0,
  isEditing: false,
};

function addExpenseToArray(state, action) {
  const id = state.expenses.length;
  const newExpenses = [...state.expenses];
  const expenseToAdd = action.expense;
  expenseToAdd.id = id;
  newExpenses.push(expenseToAdd);
  return newExpenses;
}

function removeExpenseFromArray(state, action) {
  const expenseToRemove = action.expense;

  return state.expenses.filter((expense) => expense.id !== expenseToRemove.id);
}

function calculateNewValue(state, action, sum) {
  if (sum) {
    const { ask } = action.expense.exchangeRates[action.expense.currency];

    const expenseValue = Number(action.expense.value) * Number(ask);
    return state.totalExpenses + expenseValue;
  }
  const { ask } = action.expense.exchangeRates[action.expense.currency];

  const expenseValue = Number(action.expense.value) * Number(ask);
  return state.totalExpenses - expenseValue;
}

function editExpenses(state, action) {
  let expensesToEdit = [...state.expenses];
  expensesToEdit = expensesToEdit.map((expense) => {
    if (Number(expense.id) === Number(state.idToEdit)) {
      return { ...expense, ...action.editedExpense };
    }
    return expense;
  });

  let sum = 0;

  expensesToEdit.forEach((expense) => {
    const value = Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask);
    sum += value;
  });

  return {
    ...state,
    expenses: expensesToEdit,
    isEditing: false,
    idToEdit: 0,
    totalExpenses: sum,
  };
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES: {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  case ADD_EXPENSE: {
    const newExpenses = addExpenseToArray(state, action);

    const newTotal = calculateNewValue(state, action, true);

    return {
      ...state,
      expenses: newExpenses,
      totalExpenses: newTotal,
    };
  }

  case REMOVE_EXPENSE: {
    const newExpenses = removeExpenseFromArray(state, action);

    const newTotal = calculateNewValue(state, action, false);

    return {
      ...state,
      expenses: newExpenses,
      totalExpenses: newTotal,
    };
  }

  case SET_IS_EDITING: {
    return {
      ...state,
      isEditing: true,
      idToEdit: action.id,
    };
  }
  case EDIT_EXPENSE: {
    return editExpenses(state, action);
  }
  default:
    return state;
  }
};

export default wallet;
