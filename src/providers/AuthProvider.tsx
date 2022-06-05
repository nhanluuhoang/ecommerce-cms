import React, { useContext, createContext, useState, useEffect, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { loadUser } from '../lib/auth';
import { Spin } from 'antd';

interface IAuthContext  {
    user: {} | null;
    setUser: ({type}:any) => void;
}

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </button>
        </div>
    );
};

const AuthContext = createContext({} as IAuthContext)

type AppProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({children}: AppProviderProps) => {
    const [user, setUser] = useState<{} | null>(null);
    const auth =  { user, setUser }
    
    useEffect( () => {
        loadUser().then((resp) => {
            setUser(resp.data)
        })
    }, []);
    
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        height: '100vh',
                        padding: '10px',
                        boxSizing: 'border-box',
                        textAlign: 'center'
                    }}
                >
                    <Spin style={{marginTop: '45vh',}} size="large" tip="Loading..." />
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <AuthContext.Provider value={auth}>
                    {children}
                </AuthContext.Provider>
            </ErrorBoundary>
        </Suspense>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === "undefined")
        throw new Error("useAuth must be used within AuthProvider");
    return context;
}

export { AuthProvider, useAuth }
