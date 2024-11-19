import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Evaluations from './pages/Evaluations';
import Profile from './pages/Profile';
import EvaluationForm from './pages/EvaluationForm';
import Reports from './pages/Reports';
import Employees from './pages/Employees';
import NotFound from './pages/404';
import Settings from './pages/Settings';
import { setCredentials } from './features/auth/authSlice';
import { useValidateTokenMutation } from './lib/api';
import DotSpinner from './components/DotSpinner';
import { Toaster } from 'sonner'


const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [validateToken, { isLoading }] = useValidateTokenMutation();

  useEffect(() => {
    if (token) {
      validateToken({ token })
        .unwrap()
        .then((res) => {
          console.log(res)
          dispatch(setCredentials({ token, user: res.user }));
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('token');
        });
    }
  }, [token, dispatch, validateToken]);

  if (isLoading) {
    return (<div className='w-screen min-h-dvh flex items-center justify-center'><DotSpinner color="bg-blue-600" /></div>);
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/evaluations" 
          element={isAuthenticated ? <Evaluations /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/employees" 
          element={isAuthenticated ? <Employees /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/evaluation/:id" 
          element={isAuthenticated ? <EvaluationForm /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/reports" 
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} 
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;