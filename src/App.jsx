import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import your Firebase auth
import './App.css';
import Mainlayout from './layout/mainlayout';
import Home from './pages/home';
import { Toaster } from 'react-hot-toast';
import Userdetail from './components/userdetail';
import GoogleSignIn from './pages/signin/signin';
import PrivateRoute from './pages/privateroute/privateroute';
import Orders from './components/order';
import FundsDashboard from './components/funddashboard';
import Portfolio from './components/portfolio';
import IPODashboard from './components/bids';
import FundsOverview from './components/funds';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("token", "authenticated"); // Optional: keep for backup
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { style: { background: "#10B981", color: "#fff" } },
          error: { style: { background: "#EF4444", color: "#fff" } },
        }}
      />
      <Routes>
        <Route 
          path='/signin' 
          element={isAuthenticated ? <Navigate to="/" replace /> : <GoogleSignIn />}
        />
        
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/' element={<Mainlayout />}>
            <Route index element={<Home />} />
            <Route path='user' element={<Userdetail />} />
            <Route path='orders' element={<Orders />} />
            <Route path='dashboard' element={<FundsDashboard />} />
            <Route path='portfolio' element={<Portfolio />} />
            <Route path='bids' element={<IPODashboard />} />
            <Route path='funds' element={<FundsOverview />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;