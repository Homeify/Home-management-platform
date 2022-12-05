import React from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n/config.js';
import { Button } from '@chakra-ui/react';

function App() {
    const { t } = useTranslation();
    return (
        <div className='App'>
            <Button colorScheme='primary'>{t('add')}</Button>
        </div>
    );
}

export default App;
