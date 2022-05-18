import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesFromApi } = this.props;
    fetchCurrenciesFromApi();
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <p>Wallet</p>
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesFromApi: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  fetchCurrenciesFromApi: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
