import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import { Layout } from './components/Layout.jsx';
import './index.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
}

export default App;