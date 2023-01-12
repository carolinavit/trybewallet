import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies as saveCurrenciesACTION } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

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

    saveCurrencies(formatedCurrencies);
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select data-testid="currency-input">
          {currencies.map((currency) => (
            <option key={ currency }>{currency}</option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: (currencies) => dispatch(saveCurrenciesACTION(currencies)),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  saveCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
