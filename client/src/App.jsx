import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicRoutes, ListenerRoutes, ArtistRoutes, AdminRoutes } from './AppRoutes.jsx';
import { Layout } from './components/Layout';
import AuthRoute from './api/AuthRoute';
import './index.css';

const SpeedInsights = React.lazy(() =>
  import('@vercel/speed-insights/react').then(module => {
    if (module && module.SpeedInsights) {
      return { default: module.SpeedInsights };
    }
    throw new Error('SpeedInsights module not found');
  })
);

const App = () => {
  return (
    <>
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
      <Suspense fallback={<div>Loading performance insights...</div>}>
        <SpeedInsights />
      </Suspense>
    </>
  );
};

export default App;
