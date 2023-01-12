// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
  currentCurrency: 'BRL',
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES: {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  default:
    return state;
  }
};

export default wallet;
