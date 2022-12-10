import React from 'react';
import './i18n/config.js';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/routes.js';

import { Home, Landing, Group, SignIn, SignUp } from './components/pages';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={`${ROUTES.GROUP}/:uid`} element={<Group />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
