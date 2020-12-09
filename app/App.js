import React from 'react';
import styled from 'styled-components';
import ShoeProvider, { ShoeContext } from './ShoeProvider';
import '@babel/polyfill';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';

const App = () => {
  return (
    <ShoeProvider>
      <BodyWrap>
        <Router>
          <Header />
          <ShoeContext.Consumer>
            {(store) => (
              <Switch>
                <Route exact path="/" render={() => <Home inventory={store} />} />
              </Switch>
            )}
          </ShoeContext.Consumer>
        </Router>
      </BodyWrap>
      <NotificationContainer />
    </ShoeProvider>
  )
}

export default App;


const BodyWrap = styled.main`
`