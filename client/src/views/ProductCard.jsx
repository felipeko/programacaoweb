import React from 'react'
import {addProduct} from '../reducers/actions'
import {CircularProgress, RaisedButton} from 'material-ui'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class UnconnectedProductCard extends React.Component {
  state = {}

  addToWishList = () => {
    this.setState({loading: true})
    fetch('/addToWishlist/'+this.props.user.username,
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
    const {product, addProduct, quantity, user} = this.props
    const {loading, recentlyAddedToWishlist} = this.state
    return (
      <div>
        <h3>{product.nome}</h3>
        <span>R$ {product.preco}</span>
        <div>Vendedor {product.vendedor}</div>
        <div>{product.categoria} - {product.descricao}</div>
        <div><RaisedButton onClick={() => addProduct(product.id, 1)}>Adicionar ao
          Carrinho {quantity && `(contém ${quantity})`}</RaisedButton></div>
        {user ?
          <div>
            <RaisedButton onClick={() => this.addToWishList(product.id)}>
              Adicionar na WishList
              {loading && <CircularProgress/>}
            </RaisedButton>
            {recentlyAddedToWishlist &&
            <span>Adicionado na wishlist sucesso <Link to="/wishlist">(Ver Wishlist)</Link></span>}
          </div> :
          <div>Faça login para poder adicionar a wishlist!</div>
        }
      </div>
    )
  }
}

export const ProductCard = connect((state, ownProps) => ({user: state.user, quantity: state.shoppingCart[ownProps.product._id]}), {addProduct})(UnconnectedProductCard )
