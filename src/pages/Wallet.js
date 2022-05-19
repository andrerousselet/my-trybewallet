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
    const { currencies } = this.props;
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select id="currencies">
              {currencies.map((currency) => <option key={ currency }>{currency}</option>)}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select
              id="payment-method"
              data-testid="method-input"
            >
              <option>Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categories">
            Categoria:
            <select
              id="categories"
              data-testid="tag-input"
            >
              <option>Selecione</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              data-testid="description-input"
            />
          </label>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesFromApi: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrenciesFromApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
