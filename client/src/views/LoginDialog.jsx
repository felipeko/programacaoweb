import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import {login} from '../reducers/actions'

class UnconnectedLoginDialog extends React.PureComponent {

  state = {username: "", password: "", errors: []}

  handleLogin = (e) => {
    e && e.preventDefault()
    if (this.state.username.length < 2) {
      this.setState({errors: ["Username inválido (precisa ter pelo menos 2 caracteres)"]})
    } else if (this.state.password.length <= this.state.username.length) {
      this.setState({errors: ["Password inválido (precisa ser maior do que o nome de usário)"]})
    } else {
      this.props.login({username:this.state.username,password:this.state.password})
      this.props.closeDialog()
    }
  }

  render() {
    const {username, password, errors} = this.state

    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Enviar"
        primary={true}
        onClick={this.handleLogin}
      />,
    ];

    return (
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <form onSubmit={this.handleLogin}>
            <label>
              Username: <input value={username} onChange={(e)=>this.setState({username:e.target.value})} type="text"/>
            </label>
            <label>
              Password: <input value={password} onChange={(e)=>this.setState({password:e.target.value})} type="password"/>
            </label>
            <div>{errors.map(error => <div key={error}>{error}</div>)}</div>
            <input type="submit" style={{display:"none"}} />
          </form>
        </Dialog>
    );
  }
}
export const LoginDialog = connect(undefined,{login})(UnconnectedLoginDialog)