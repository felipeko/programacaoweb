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


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/produto/:id" component={Produto} exact/>
              <Route path="/cart" component={Carrinho} exact/>
              <Route path="/wishlist" component={Wishlist} exact/>
              <Route path="/" component={Index} exact/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}




const Index = () => (
  <div>
    <Link to="/wishlist">Acessar Wishlist</Link>
    <Link to="/cart">Acessar Carrinho</Link>
    <h4>Lista de produtos (JSON local, apenas teste, click para acessar)</h4>
    <List>
      {PRODUTOS.map(produto =>
        <ListItem key={produto.id} containerElement={<Link to={'/produto/' + produto.id}/>}>{produto.nome}</ListItem>
      )}
    </List>
  </div>
)

export default App
