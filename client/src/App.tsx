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
import LandingPage from './pages/Landing';
import ProtectedRoute from './pages/ProtectedRoute';
import Department from './pages/Department';


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
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/evaluations" element={<Evaluations />} />
					<Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Department />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/evaluation/:id" element={<EvaluationForm />} />
					<Route path="/reports" element={<Reports />} />
					<Route path="/settings" element={<Settings />} />
				</Route>

				<Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Toaster />
		</Router>
	);
};

export default App;