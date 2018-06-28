import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {login, logout} from '../reducers/actions'
import {RaisedButton} from 'material-ui'
import {LoginDialog} from './LoginDialog'

class UnconnectedNavbar extends React.Component {
  state = {open:false}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  }

  getUser = () => {
    const url_string = window.location.href
    const url = new URL(url_string);
    return url.searchParams.get("user");
  }


  componentDidMount() {
    if (!this.props.user && this.getUser()) {
      this.props.login({username:this.getUser()})
    }
  }

  render() {
    const {match: {path},logout, user} = this.props
    return (<div>
      {path !== '/' && <Link to="/">Voltar</Link>}
      {path !== '/cart' && <Link to="/cart">Acessar carrinho</Link>}
      {path !== '/wishlist' && user && <Link to="/wishlist">Acessar wishlist</Link>}
      {
        user ?
          <span>Bem vindo {user.username}<a onClick={logout}>(Logout)</a></span>:
          <RaisedButton label="Login" onClick={this.handleOpen} />
      }
      {this.state.open && <LoginDialog open={this.state.open} closeDialog={this.handleClose} />}
    </div>)
  }
}

export const Navbar = connect(({user})=>({user}),{login,logout})(withRouter(UnconnectedNavbar))