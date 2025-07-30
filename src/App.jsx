import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function App() {
  const isLoggedIn = document.cookie.includes('token');

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/register" replace />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />

          {/* Keep the other protected routes and the catch-all below */}
          <Route
            path="/checkout"
            element={isLoggedIn ? <Checkout /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/orders"
            element={isLoggedIn ? <Orders /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;