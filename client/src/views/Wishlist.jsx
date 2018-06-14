import React from 'react'
import {PRODUTOS} from '../FakeProdutos'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'
import {Link} from 'react-router-dom'
import {Navbar} from './Navbar'


export class Wishlist extends React.Component {
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
