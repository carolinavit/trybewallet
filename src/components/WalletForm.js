import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  saveCurrencies as saveCurrenciesACTION,
  addExpense as addExpenseACTION,
} from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  handleChange = (target) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpenseToState = async () => {
    const { addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchangeRates = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    )
      .then((response) => response.json())
      .then((currencies) => currencies);

    addExpense({
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });

    this.setState({
      value: '',
      description: '',
    });
  };

  async fetchCurrencies() {
    const { saveCurrencies } = this.props;

    const currenciesFetch = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    )
      .then((response) => response.json())
      .then((currencies) => currencies);

    const currenciesArray = Object.keys(currenciesFetch);

    const formatedCurrencies = currenciesArray.filter(
      (currency) => currency !== 'USDT',
    );
    console.log(currenciesFetch);
    saveCurrencies(formatedCurrencies);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <form>
          <input
            type="text"
            id="value"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="Valor"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ (e) => this.handleChange(e.target) }
          />
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ (e) => this.handleChange(e.target) }
          >
            {currencies.map((curr) => (
              <option key={ curr }>{curr}</option>
            ))}
          </select>
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ (e) => this.handleChange(e.target) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ (e) => this.handleChange(e.target) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
        <button type="button" onClick={ this.addExpenseToState }>
          Adicionar despesa
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (currencies) => dispatch(saveCurrenciesACTION(currencies)),
  addExpense: (expense) => dispatch(addExpenseACTION(expense)),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
