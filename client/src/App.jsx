import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes, ListenerRoutes, ArtistRoutes, AdminRoutes } from './AppRoutes.jsx';
import { Layout } from './components/Layout';
import AuthRoute from './api/AuthRoute';
import Artist from './components/artistpage/Artist';
import Listener from './components/listener/Listener';
import './index.css';
import Admin from './components/admin/Admin';

const App = () => {
  return (

    <Layout>
      <Routes>
        {PublicRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
        <Route element={<AuthRoute role={1} />}>
          {ListenerRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Route>
        <Route element={<AuthRoute role={2} />}>
          {ArtistRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Route>
        <Route element={<AuthRoute role={3} />}>
          {AdminRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;