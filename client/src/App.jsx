import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
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

        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
        <Route element={<AuthRoute role={3} />}>
          <Route path='/admin' element={<Admin />} />
        </Route>
        <Route element={<AuthRoute role={2} />}>
          <Route path='/artist' element={<Artist />} />
        </Route>
        <Route element={<AuthRoute role={1} />}>
          <Route path='/listener' element={<Listener />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;