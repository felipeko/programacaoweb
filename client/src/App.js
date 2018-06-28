import React, {Component} from 'react'
import './Reboot.css'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui'
import {PRODUTOS} from './FakeProdutos'
import {BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom'
import {Produto} from './views/Produto'
import {Carrinho} from './views/Carrinho'
import {Wishlist} from './views/Wishlist'
import {Navbar} from './views/Navbar'
import {connect} from 'react-redux'
import {initCart} from './reducers/actions'


class App extends Component {

  componentDidMount() {
    this.initCart()
  }

  componentDidUpdate() {
    this.initCart()
  }

  initCart = () => {
    if (!this.props.shoppingCart.id) {
      fetch('/initCart',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({})
        }
      )
        .then(e => e.json())
        .then(({id}) => this.props.initCart(id))
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/produto/:id" component={Produto} exact/>
              <Route path="/cart" component={Carrinho} exact/>
              <Route path="/wishlist" component={Wishlist} exact/>
              <Route path="/restApi" component={RestApi} exact/>
              <Route path="/" component={Index} exact/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}


class RestApi extends React.Component {
  state = {carts: [],cart: {}}

  componentDidMount() {
    fetch('/carts/')
      .then(_=>_.json())
      .then(({carts}) => this.setState({carts}))
  }

  loadCart = (id) => {
    fetch('/carts/'+id)
      .then(_=>_.json())
      .then(cart => this.setState({cart:{...this.state.cart,[id]:cart}}))
  }

  payCart = (id) => {
    fetch('/payCart/'+id, {method: "POST"})
  }

  render() {
    const {carts} = this.state
    return <div>
      <Navbar/>
      <h4>Carrinhos existentes</h4>
      {
        carts.map(id => <li key={id}>
          {id} <a onClick={() => this.loadCart(id)}>(carregar)</a><a onClick={() => this.payCart(id)}>(marcar como pago)</a>
          {
            this.state.cart[id] &&
            <code>
              {this.state.cart[id]}
            </code>
          }
        </li>)
      }
    </div>
  }
}

const Index = () => (
  <div>
    <Navbar/>
    <Link to="restApi">restApi admin</Link>
  </div>
)

export default connect(({shoppingCart}) => ({shoppingCart}), {initCart})(App)
