/**
 * App.jsx
 * --------
 * Root component. Defines the React Router layout and all application routes.
 *
 * Route structure:
 *   /                      → HomePage
 *   /products              → ProductsPage
 *   /products/:productId   → ProductDetailsPage
 *   /cart                  → CartPage
 *   /orders                → OrdersPage  [protected]
 *   /account               → AccountPage (Login/Register)
 *   *                      → NotFoundPage (404)
 */

import { Routes, Route } from 'react-router-dom';

import Navbar         from './components/Navbar/Navbar';
import Footer         from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import HomePage          from './pages/HomePage/HomePage';
import ProductsPage      from './pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import CartPage          from './pages/CartPage/CartPage';
import OrdersPage        from './pages/OrdersPage/OrdersPage';
import AccountPage       from './pages/AccountPage/AccountPage';
import NotFoundPage      from './pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        {/* ── Public Routes ─────────────────────────────────────────────── */}
        <Route path="/"               element={<HomePage />} />
        <Route path="/products"       element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart"           element={<CartPage />} />
        <Route path="/account"        element={<AccountPage />} />

        {/* ── Protected Routes ──────────────────────────────────────────── */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* ── 404 Catch-All ─────────────────────────────────────────────── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
