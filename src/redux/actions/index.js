export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const SET_IS_EDITING = 'SET_IS_EDITING';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});

export const setIsEditing = (id) => ({
  type: SET_IS_EDITING,
  id,
});

export const editExpense = (editedExpense) => ({
  type: EDIT_EXPENSE,
  editedExpense,
});
