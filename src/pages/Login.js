import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateInputs());
  }

  handleSubmit = (event) => {
    const { email } = this.state;
    const { dispatchUserEmail, history } = this.props;
    event.preventDefault();
    localStorage.setItem('user-email', JSON.stringify(email));
    dispatchUserEmail(email);
    history.push('/carteira');
  }

  validateInputs = () => {
    const { email, password } = this.state;

    const PASSWORD_MIN_LENGTH = 6;
    const errorCases = [
      !email.length,
      // fonte do Regex -> https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
      // testes pessoais para o Regex -> https://regex101.com/
      !email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]{3}$/i),
      !password.length,
      password.length < PASSWORD_MIN_LENGTH,
    ];
    const validInputs = errorCases.every((error) => error !== true);

    this.setState({
      isDisabled: !validInputs,
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input
          name="email"
          type="email"
          value={ email }
          data-testid="email-input"
          placeholder="Insira aqui o seu e-mail"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
          placeholder="Insira aqui a sua senha"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  dispatchUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
