import React from 'react'
import {connect} from 'react-redux'
import {PRODUTOS} from '../FakeProdutos'
import {removeProduct} from '../reducers/actions'
import {Navbar} from './Navbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'

class UnconnectedCarrinho extends React.Component {
  state = {}

  componentDidMount() {
    Promise.all(Object.keys(this.props.produtos).filter((id) => id !== 'id').map(produtoId =>
      fetch('http://150.162.244.102:3000/pesquisaPorId?id='+produtoId)
      // Promise.resolve(PRODUTOS.find(_ => _.id === Number(produtoId)))
        .then(p => ({...p, id: produtoId}))
    )).then(loadedProdutos => {
        this.setState({loadedProdutos})
      }
    )
  }

  render() {
    const {produtos, removeProduct, user} = this.props
    const {loadedProdutos} = this.state
    return <div>
      <Navbar/>
      {loadedProdutos ?
        <div>
          <a href={"//web.thomas.feijoo.vms.ufsc.br:9000?id="+produtos.id}><h4>Efetuar pagamento e Finalizar compra</h4></a>
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
              {Object.entries(produtos).filter(([id]) => id !== 'id')
                .map(([id, quantidade]) => ({...loadedProdutos.find(_ => _.id === id), quantidade}))
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
        </div> :
        'Carregando...'
      }
    </div>
  }
}

export const Carrinho = connect((state) => ({
  produtos: state.shoppingCart,
  user: state.user
}), {removeProduct})(UnconnectedCarrinho)