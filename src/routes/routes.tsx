import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import ErrorBoundary from "../components/ErrorBoundary";
import { useAuth } from "../hooks/useAuth";

// Lazy Loaded Components
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/SIgnup"));
const Home = lazy(() => import("../pages/Products/Home"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const NotFound = lazy(() => import("../components/NotFound"));

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { isAuthenticated, role } = useAuth(); // Get auth state

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

const AuthRedirect = () => {
  const { isAuthenticated, role } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return null;
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    children:[ { path: "/", element: <Navigate to="/login" replace /> },
  
      { path: "/login", element: (<><AuthRedirect/><Suspense fallback={<div>Loading...</div>}><Login /></Suspense></>) },
      { path: "/signup", element:(<><AuthRedirect/> <Suspense fallback={<div>Loading...</div>}><Signup /></Suspense> </>)},
    
      // Customer Routes
      {
        path: "/home",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <ErrorBoundary>
            <Suspense fallback={<div>Loading Home...</div>}>
              <Home />
            </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <ErrorBoundary>
            <Suspense fallback={<div>Loading Product Details...</div>}>
              <ProductDetails />              
            </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
    
      // Admin Routes
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ErrorBoundary>
            <Suspense fallback={<div>Loading Admin Dashboard...</div>}>
              <AdminDashboard />
            </Suspense>
            </ErrorBoundary>
          </ProtectedRoute>
        ),
      },
    
      { path: "*", element: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense> },]
 
  }
]);
