import React from 'react';
import { Mutation } from 'react-apollo';
import {withRouter} from 'react-router-dom';
import {REGISTER} from '../graphql/mutations';
import './register-form.css';

class RegisterForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    return (
      <Mutation mutation={REGISTER} variables={{email: this.state.email, password: this.state.password}}
        update={(cache, {data: {login}}) => {
          this.props.history.push('/login');
        }}>
        {(register, {loading, error}) => {    
          return (
            <div className="register-container">
              <form className="register-form" method='post' onSubmit={(e) => {
                e.preventDefault();
                register();
              }}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <legend>Register</legend>
                  {/* <Error error={error} /> */}
                
                  <label htmlFor="email">Email</label>
                  <input 
                  type='email' 
                  name='email' 
                  placeholder='Email' 
                  value={this.state.email}
                  onChange={this.saveToState} />
                  <label htmlFor="password">Password</label>
                  <input 
                  type='password' 
                  name='password' 
                  placeholder='Password' 
                  value={this.state.password}
                  onChange={this.saveToState} />
                  <button type='submit'>Register</button>
                </fieldset>
              </form>
            </div>
          )}}
      </Mutation>
    );
  }
}

export default withRouter(RegisterForm);