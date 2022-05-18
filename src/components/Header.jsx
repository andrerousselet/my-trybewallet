import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div
          data-testid="email-field"
        >
          { userEmail }
        </div>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
        <div
          data-testid="total-field"
        >
          { 0 }
        </div>
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
