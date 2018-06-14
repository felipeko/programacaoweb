import React from 'react'
import {PRODUTOS} from '../FakeProdutos'
import {ProductCard} from './ProductCard'
import {Navbar} from './Navbar'

export const Produto = ({match: {params: {id}}}) => (
  <div>
    <Navbar/>
    <div>
      <ProductCard product={PRODUTOS.find(_ => _.id === Number(id))}/>
    </div>
  </div>
)

