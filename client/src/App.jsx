import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
//import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout.jsx';
//import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index}  {...rest} element={element} />;
            })}
          </Routes>
      </Layout>
    );
  }
}
