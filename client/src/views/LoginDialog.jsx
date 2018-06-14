import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'

class UnconnectedLoginDialog extends React.PureComponent {
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleLogin = () => {

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Enviar"
        primary={true}
        onClick={this.handleLogin}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <input type="text"/>
          </form>
        </Dialog>
      </div>
    );
  }
}
export const LoginDialog = connect(({user}) => ({user}))(UnconnectedLoginDialog)