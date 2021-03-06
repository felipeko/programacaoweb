import React from 'react'
import {PRODUTOS} from '../FakeProdutos'
import {ProductCard} from './ProductCard'
import {Navbar} from './Navbar'

export class Produto extends React.Component {
  state = {}

  componentDidMount() {
    fetch('http://150.162.244.102:3000/pesquisaPorId?id='+this.props.match.params.id)
    // Promise.resolve(PRODUTOS.find(_=>_.id === Number(this.props.match.params.id)))
      .then(e=>e.json())
      .then(produto => this.setState({produto: {...produto,id:this.props.match.params.id}}))
      .catch(e=>this.setState({error:"Não foi possivel encontrar o produto"}))
  }
  render() {
    const {produto,error} = this.state
    return (<div>
      <Navbar/>
      {
        produto &&
        <div>
          <ProductCard product={produto}/>
          <iframe src={"http://sv.lucas.petroski.vms.ufsc.br:3001/produto?produto="+produto.id} width={800} height={600}/>
        </div>
      }
      {
        error
      }
      {
        !produto && !error && "Carregando produto..."
      }

    </div>)
  }
}
