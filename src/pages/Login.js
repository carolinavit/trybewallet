import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail as saveEmailACTION } from '../redux/actions';

const MIN_LENGTH = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValidEmail: false,
      isValidPassword: false,
    };
    this.validateInputs = this.validateInputs.bind(this);
  }

  handleLogin(email) {
    const { saveEmail } = this.props;
    saveEmail(email);
  }

  validateInputs(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (name === 'email') {
      if (value.includes('@') && value.includes('.com')) {
        this.setState({
          isValidEmail: true,
        });
      } else {
        this.setState({
          isValidEmail: false,
        });
      }
    }

    if (name === 'password') {
      if (value.length >= MIN_LENGTH) {
        this.setState({
          isValidPassword: true,
        });
      } else {
        this.setState({
          isValidPassword: false,
        });
      }
    }
  }

  render() {
    const { email, password, isValidEmail, isValidPassword } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.validateInputs }
        />

        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.validateInputs }
          data-testid="password-input"
          placeholder="Senha"
        />

        <Link to="/carteira">
          <button
            type="button"
            disabled={ !(isValidEmail && isValidPassword) }
            onClick={ () => this.handleLogin(email) }
          >
            Entrar
          </button>
        </Link>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailACTION(email)),
});
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
