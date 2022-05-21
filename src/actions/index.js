// typeActions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const HANDLE_API_ERROR = 'HANDLE_API_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// Coloque aqui suas actions
// Action do Login
export const userEmail = (email) => ({
  type: SET_USER_EMAIL,
  payload: email,
});

// Actions da API
export const requestCurrenciesApi = () => ({
  type: REQUEST_API,
});

export const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  payload: data,
});

export const handleCurrenciesApiError = (error) => ({
  type: HANDLE_API_ERROR,
  payload: error,
});

// Action das despesas
export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

// thunk function: carregamento da página (Wallet) -> componentDidMount
export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrenciesApi());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(getCurrencies(data));
    } catch (error) {
      dispatch(handleCurrenciesApiError(error));
    }
  };
}

// thunk function 2: adicionando despesas
export function setExpenses(state) {
  return async (dispatch) => {
    dispatch(requestCurrenciesApi());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchangeRates = await response.json();
      dispatch(addExpense({ ...state, exchangeRates }));
    } catch (error) {
      dispatch(handleCurrenciesApiError(error));
    }
  };
}
