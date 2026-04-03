import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = (product, count) => {
    const {cartList} = this.state
    const isProductPresent = cartList.find(item => item.id === product.id)

    if (isProductPresent) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + count}
            : item,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...product, quantity: count}],
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== productId),
    }))
  }

  incrementCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === productId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItem = productId => {
    const {cartList} = this.state
    const isCartValue1 = cartList.find(
      item => item.id === productId && item.quantity === 1,
    )

    if (!isCartValue1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === productId ? {...item, quantity: item.quantity - 1} : item,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(item => item.id !== productId),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItem,
          decrementCartItemQuantity: this.decrementCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
