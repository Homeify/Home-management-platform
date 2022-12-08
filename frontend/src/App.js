import React from 'react';
import './i18n/config.js';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/routes.js';

import { Home, Landing, MyGroups } from './components/pages';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.MYGROUPS} element={<MyGroups />} />
                <Route path={ROUTES.MYTASKS} element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
