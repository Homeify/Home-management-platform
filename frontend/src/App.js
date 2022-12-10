import React from 'react';
import './i18n/config.js';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/routes.js';
import {
  Home,
  Landing,
  Group,
  SignIn,
  SignUp,
  NotFound,
} from './components/pages';
import { PrivateRoute, UnauthRoute } from './components/atoms';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route
          path={ROUTES.HOME}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={`${ROUTES.GROUP}/:uid`}
          element={
            <PrivateRoute>
              <Group />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.SIGN_IN}
          element={
            <UnauthRoute>
              <SignIn />
            </UnauthRoute>
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <UnauthRoute>
              <SignUp />
            </UnauthRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
