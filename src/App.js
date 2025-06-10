import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { LogIn } from './pages/LogIn';
import { ForgotPassword } from './pages/ForgotPassword';
import { Layout } from './pages/Layout';
import { Provider } from 'react-redux';
import ToastContainers from './lib/ToastContainer';
import store from './redux/store';

// Create a ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has admin or moderator role
    if (user?.role !== 'admin' && user?.role !== 'moderator') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/login" element={<LogIn />} />

                    {/* Protect all other routes */}
                    <Route path="*" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>

            <ToastContainers />
        </>
    );
}

export default App;