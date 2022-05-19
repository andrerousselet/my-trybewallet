import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies, setExpenses } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesFromApi } = this.props;
    fetchCurrenciesFromApi();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value === 'Selecione' ? '' : value,
    });
  }

  handleSubmit = (event) => {
    const { dispatchExpenses } = this.props;
    event.preventDefault();
    dispatchExpenses(this.state);
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    }));
  }

  render() {
    const { value, currency, method,
      tag, description } = this.state;
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
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              id="currencies"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select
              id="payment-method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
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
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
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
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleSubmit }
          >
            ADICIONAR DESPESA
          </button>
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
  dispatchExpenses: (state) => dispatch(setExpenses(state)),
});

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrenciesFromApi: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
