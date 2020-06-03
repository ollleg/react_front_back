import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {
  Switch,
  Route
} from "react-router-dom"
import { ConnectedRouter } from 'connected-react-router'

import ProductsListPage from 'components/pages/ProductsListPage'
import ProductEditPage from 'components/pages/ProductEditPage'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {history, store} = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter store={store} history={history}>
          <div className="App">
            <Switch>
              <Route exact path="/edit/:id" component={ProductEditPage} />
              <Route exact path="/" component={ProductsListPage} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default App
