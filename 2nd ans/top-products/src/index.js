import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={AllProducts} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);