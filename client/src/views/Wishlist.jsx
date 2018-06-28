import React from 'react'
import {PRODUTOS} from '../FakeProdutos'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'
import {Link} from 'react-router-dom'
import {Navbar} from './Navbar'


export class Wishlist extends React.Component {
  state = {wishlist:null}

  getUser = () => this.props.user &&  this.props.user.username

  componentDidMount() {
    fetch('/getWishlist/'+this.getUser(),{method:'GET', headers: {'Content-Type': 'application/json'}})
      .then(_=>_.json())
      .then(wishlist => {
          Promise.all(wishlist.map(produtoId =>
            fetch('http://150.162.244.102:3000/pesquisaPorId?id=' + produtoId)
            // Promise.resolve(PRODUTOS.find(_ => _.id === Number(produtoId)))
              .then(r=>r.json())
              .then(p => ({...p, id: produtoId}))
          )).then(loadedProdutos => {
              this.setState({loadedProdutos, wishlist})
            }
          )
        }
      )
  }

  removeFromWishlist = (id) => {
    fetch('/removeFromWishlist/'+this.getUser(),
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
    const {wishlist, loadedProdutos} = this.state
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
                  .map((id) => loadedProdutos.find(_ => _.id === id))
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
