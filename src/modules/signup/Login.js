import React from "react";
import { Redirect } from 'react-router';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./login.css";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      redirect: false,
      email: "",
      password: "",
      emailValid: null,
      passwordValid: null,
    };
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
      emailValid: emailRegex.test(event.target.value.toLowerCase()) ? 'success' : 'error'
    });
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
      passwordValid: event.target.value.length < 8 ? 'error' : 'success'
    });
  }

  onLogin = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
  
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.setState({ redirect: true })
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />

    return (
      <div className="Login">
        <form onSubmit={this.onLogin}>
          <FormGroup controlId="email" validationState={this.state.emailValid}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              name="email"
              type="email"
              bsSize="large"
              value={this.state.email}
              onChange={this.onEmailChange} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="password" validationState={this.state.passwordValid}>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              name="password"
              type="password"
              bsSize="large"
              value={this.state.password}
              onChange={this.onPasswordChange} />
            <FormControl.Feedback />
          </FormGroup>
          <Button
            block
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Log in"
            disabled={this.state.passwordValid !== 'success' || this.state.emailValid !== 'success' }>
            {this.state.isLoading && <Glyphicon glyph="refresh" className="spinning" />}Log in
          </Button>
        </form>
      </div>
    );
  }
}