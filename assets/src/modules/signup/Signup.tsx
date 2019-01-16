import { Auth } from "aws-amplify";
import React from "react";
import { Redirect } from 'react-router';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon, HelpBlock } from "react-bootstrap";
import "./signup.css";
import "./home.css";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface SignupProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
}

interface SignupState {
  loading: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  confirmationCode: string;
  emailValid: "success" | "error" | "warning" | undefined;
  passwordValid: "success" | "error" | "warning" | undefined;
  confirmPasswordValid: "success" | "error" | "warning" | undefined;
  confirmationCodeValid: "success" | "error" | "warning" | undefined;
  user: any;
  redirect: boolean;
}

export default class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      emailValid: undefined,
      passwordValid: undefined,
      confirmPasswordValid: undefined,
      confirmationCodeValid: undefined,
      user: undefined,
      redirect: false
    };
  }

  onEmailChange = (event: React.FormEvent<FormControl>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      email: target.value,
      emailValid: emailRegex.test(target.value.toLowerCase()) ? 'success' : 'error'
    });
  }

  onPasswordChange = (event: React.FormEvent<FormControl>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      password: target.value,
      passwordValid: target.value.length < 8 ? 'error' : 'success'
    });
  }

  onConfirmPasswordChange = (event: React.FormEvent<FormControl>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      confirmPassword: target.value,
      confirmPasswordValid: target.value !== this.state.password ? 'error' : 'success'
    });
  }

  onConfirmationCodeChange = (event: React.FormEvent<FormControl>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      confirmationCode: target.value,
      confirmationCodeValid: target.value.length > 0 ? 'error' : 'success'
    });
  }

  onSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });
  
    try {
      const user = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({ user, loading: false });
    } catch (e) {
      alert(e.message);
      this.setState({ loading: false });
    }
  }
  
  onConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });
  
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.setState({ redirect: true })
    } catch (e) {
      alert(e.message);
      this.setState({ loading: false });
    }
  }

  showConfirmationForm = () => {
    if (this.state.redirect) return <Redirect to='/' />

    return (
      <form onSubmit={this.onConfirm}>
        <FormGroup controlId="confirmationCode">
          <ControlLabel>Confirmation code</ControlLabel>
          <FormControl
            name="code"
            type="tel"
            bsSize="large"
            value={this.state.confirmationCode}
            onChange={this.onConfirmationCodeChange} />
          <FormControl.Feedback />
          <HelpBlock>A confirmation code will be sent to the email address provided</HelpBlock>
        </FormGroup>
        <Button
          block
          bsSize="large"
          type="submit"
          disabled={this.state.confirmationCodeValid === 'success'}>
          {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}Confirm
        </Button>
      </form>
    );
  }

  showSignupForm = () => {
    return (
      <form onSubmit={this.onSignup}>
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
          <HelpBlock>Must be at least 8 characters</HelpBlock>
        </FormGroup>
        <FormGroup controlId="confirmPassword" validationState={this.state.confirmPasswordValid}>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            name="confirmPassword"
            type="password"
            bsSize="large"
            value={this.state.confirmPassword}
            onChange={this.onConfirmPasswordChange} />
          <FormControl.Feedback />
        </FormGroup>
        <Button
          block
          bsSize="large"
          type="submit"
          disabled={this.state.passwordValid !== 'success' || this.state.confirmPasswordValid !== 'success' || this.state.emailValid !== 'success'}>
          {this.state.loading && <Glyphicon glyph="refresh" className="spinning" />}Log in
        </Button>
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.user === undefined ? this.showSignupForm() : this.showConfirmationForm()}
      </div>
    );
  }
}