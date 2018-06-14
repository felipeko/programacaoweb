import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import {reducers} from './reducers'
import {Provider} from 'react-redux'


const store = createStore(reducers)

let prevShoppingCart, prevUser = null
store.subscribe(()=> {
  const {shoppingCart,user} = store.getState()
  if (shoppingCart!==prevShoppingCart || user !== prevUser) {
    prevShoppingCart = shoppingCart
    prevUser = user
    fetch('/updateCart',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shoppingCart,user})
      }
    )
  }
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
