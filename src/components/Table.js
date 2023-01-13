import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense as removeExpenseACTION } from '../redux/actions';

class Table extends Component {
  formatedValue(expense) {
    const formated = (
      Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask)
    ).toFixed(2);

    return formated;
  }

  render() {
    const { expenses, removeExpense } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>

              <td>{expense.tag}</td>

              <td>{expense.method}</td>

              <td>{Number(expense.value).toFixed(2)}</td>

              <td>{expense.exchangeRates[expense.currency].name}</td>

              <td>
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>

              <td>{this.formatedValue(expense)}</td>

              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(expense) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpenseACTION(expense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
