import React from 'react'
import {connect} from 'react-redux'
import {PRODUTOS} from '../FakeProdutos'
import {removeProduct} from '../reducers/actions'
import {Navbar} from './Navbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui'

export const Carrinho = connect((state) => ({produtos: state.shoppingCart, user: state.user}), {removeProduct})(({produtos, removeProduct,user}) =>
  <div>
    <Navbar/>
    <Table onCellClick={(row, column) =>  column === 3 && removeProduct(Object.keys(produtos)[row])}>
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