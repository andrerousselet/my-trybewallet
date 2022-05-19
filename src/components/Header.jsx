import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;
    const total = expenses
      .reduce((acc, curr) => acc
        + (curr.value * curr.exchangeRates[`${curr.currency}`].ask), 0);
    return (
      <header className="header-content">
        <h1 className="header-main-title">TrybeWallet</h1>
        <section className="header-right">
          <div
            // className="header-user-email"
            data-testid="email-field"
          >
            {`Email: ${userEmail}`}
          </div>
          <div>
            {'Despesa Total: R$ '}
            <span data-testid="total-field">
              {Number(total).toFixed(2)}
            </span>
          </div>
          <div
            // className="header-currency"
            data-testid="header-currency-field"
          >
            BRL
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
