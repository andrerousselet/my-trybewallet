import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
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
          <div
            // className="header-total-expenses"
            data-testid="total-field"
          >
            {`Despesa Total: R$ ${0}`}
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
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
