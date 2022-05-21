import { GET_CURRENCIES, REQUEST_API, HANDLE_API_ERROR,
  ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SUBMIT_MODIFIED_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  onEdit: false,
  expenseOnEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
    };
  case HANDLE_API_ERROR:
    return { ...state };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      onEdit: true,
      expenseOnEdit: state.expenses.find((expense) => expense.id === action.payload),
    };
  case SUBMIT_MODIFIED_EXPENSE:
    return {
      ...state,
      onEdit: false,
      expenseOnEdit: {},
      expenses: state.expenses.map((expense, index, array) => {
        if (action.payload.id === array[index].id) {
          expense = action.payload;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
