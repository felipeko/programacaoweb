import React from 'react'
import {Link, withRouter} from 'react-router-dom'

export const Navbar = withRouter(({match: {path}}) => (
  <div>
    <Link to="/">Voltar</Link>
    {path !== '/cart' && <Link to="/cart">Acessar carrinho</Link>}
    {path !== '/wishlist' && <Link to="/wishlist">Acessar wishlist</Link>}
  </div>
))