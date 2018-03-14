import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/scss/common.scss'
import { Router } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import history from './helpers/history'
import App from './containers/App/App'
import Lobby from './containers/Lobby/Lobby'
import Lottery from './containers/Lottery/Lottery'

render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path='/Lottery/index' component={Lobby}/>
          <Route path='/Lottery/index/lobby' component={Lobby}/>
          <Route path='/Lottery/index/bet/:lotteryId' component={Lottery}/>
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
)
