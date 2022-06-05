import React from 'react';
import { AppRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import 'antd/dist/antd.css';
import './App.css';

const App: React.FC = () => {

    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
