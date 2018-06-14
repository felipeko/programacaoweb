import React from 'react'
import {addProduct} from '../reducers/actions'
import {CircularProgress, RaisedButton} from 'material-ui'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class UnconnectedProductCard extends React.Component {
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

export const ProductCard = connect((state, ownProps) => ({quantity: state[ownProps.product.id]}), {addProduct})(UnconnectedProductCard )
