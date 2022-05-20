import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ExpensesTable.css';
import { deleteExpense } from '../actions';

class ExpensesTable extends Component {
  render() {
    const { expenses, handleDelete } = this.props;
    return (
      <table>
        <thead>
          <tr className="table-head">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const usedExchangeRate = expense.exchangeRates[expense.currency].ask;
            const currencyName = expense.exchangeRates[expense.currency].name;
            return (
              <tr className="table-rows" key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ currencyName }</td>
                <td>{ Number(usedExchangeRate).toFixed(2) }</td>
                <td>{ Number(expense.value * usedExchangeRate).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                  >
                    EDITAR
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => handleDelete(expense.id) }
                  >
                    EXCLUIR
                  </button>
                </td>
              </tr>);
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id) => dispatch(deleteExpense(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
