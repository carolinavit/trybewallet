import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses, currentCurrency } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalExpenses.toFixed(2)}</p>
        <p data-testid="header-currency-field">{currentCurrency}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
  currentCurrency: state.wallet.currentCurrency,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
