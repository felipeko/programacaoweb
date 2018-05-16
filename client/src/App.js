import React, {Component} from 'react'
import './Reboot.css'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  List,
  ListItem,
  RaisedButton,
  CircularProgress,
  TableRowColumn,
  TableRow,
  TableHeaderColumn, TableBody, TableHeader
} from 'material-ui'
import {PRODUTOS} from './FakeProdutos'
import {BrowserRouter as Router, Redirect, Switch, Route, Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addProduct, removeProduct} from './reducers/actions'

const Navbar = withRouter(({match: {path}}) => (
  <div>
    <Link to="/">Voltar</Link>
    {path !== '/cart' && <Link to="/cart">Acessar carrinho</Link>}
    {path !== '/wishlist' && <Link to="/wishlist">Acessar wishlist</Link>}
  </div>
))

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

const Carrinho = connect((state) => ({produtos: state}), {removeProduct})(({produtos, removeProduct}) =>
  <div>
    <Navbar/>
    <Table onCellClick={(row, column) => column === 3 && removeProduct(Object.keys(produtos)[row])}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>Produto</TableHeaderColumn>
          <TableHeaderColumn>Preço</TableHeaderColumn>
          <TableHeaderColumn>Quantidade</TableHeaderColumn>
          <TableHeaderColumn/>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
      >
        {Object.entries(produtos)
          .map(([id, quantidade]) => ({...PRODUTOS.find(_ => _.id === Number(id)), quantidade}))
          .map(produto =>
            <TableRow key={produto.id}>
              <TableRowColumn>{produto.nome}</TableRowColumn>
              <TableRowColumn>R$ {produto.preco}</TableRowColumn>
              <TableRowColumn>{produto.quantidade}</TableRowColumn>
              <TableRowColumn>Remover</TableRowColumn>
            </TableRow>
          )}
      </TableBody>
    </Table>
  </div>
)

class Wishlist extends React.Component {
  state = {wishlist:null}

  componentDidMount() {
    fetch('getWishlist',{method:'GET', headers: {'Content-Type': 'application/json'}})
      .then(_=>_.json())
      .then(wishlist => this.setState({wishlist}))
  }

  removeFromWishlist = (id) => {
    fetch('/removeFromWishlist',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
      }
    ).then(() => {
      this.setState(({wishlist}) => ({wishlist:wishlist.filter(_=>_!==id)}))
    })
  }

  render() {
    const {wishlist} = this.state
    return (
      <div>
        <Navbar/>
        {
          !wishlist ? <div>Carregando...</div> :
            <Table onCellClick={(row, column) => column === 2 && this.removeFromWishlist(wishlist[row])}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn>Produto</TableHeaderColumn>
                  <TableHeaderColumn/>
                  <TableHeaderColumn/>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
              >
                {wishlist
                  .map((id) => PRODUTOS.find(_ => _.id === Number(id)))
                  .map(produto =>
                    <TableRow key={produto.id}>
                      <TableRowColumn>{produto.nome}</TableRowColumn>
                      <TableRowColumn><Link to={"/produto/"+produto.id}>Acessar</Link></TableRowColumn>
                      <TableRowColumn>Remover</TableRowColumn>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
        }
      </div>
    )
  }
}

const Produto = ({match: {params: {id}}}) => (
  <div>
    <Navbar/>
    <div>
      <ConnectedProductCard product={PRODUTOS.find(_ => _.id === Number(id))}/>
    </div>
  </div>
)


class ProductCard extends React.Component {
  state = {}

  addToWishList = () => {
    this.setState({loading: true})
    fetch('/addToWishlist',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.props.product)
      }
    ).then(() => {
      this.setState({loading: false, recentlyAddedToWishlist: true})
    })
  }

  render() {
    const {product, addProduct, quantity} = this.props
    const {loading, recentlyAddedToWishlist} = this.state
    return (
      <div>
        <div>{product.nome} - R$ {product.preco}</div>
        <div>
          <RaisedButton onClick={() => this.addToWishList(product.id)}>
            Adicionar na WishList
            {loading && <CircularProgress/>}
          </RaisedButton>
          {recentlyAddedToWishlist &&
          <span>Adicionado na wishlist sucesso <Link to="/wishlist">(Ver Wishlist)</Link></span>}
        </div>
        <div><RaisedButton onClick={() => addProduct(product.id, 1)}>Adicionar ao
          Carrinho {quantity && `(contém ${quantity})`}</RaisedButton></div>
      </div>
    )
  }
}

const ConnectedProductCard = connect((state, ownProps) => ({quantity: state[ownProps.product.id]}), {addProduct})(ProductCard)

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
