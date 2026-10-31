import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isCheckingAuth, children }) {
  // Mientras se valida el token no decidimos nada (evita rebotar al usuario al recargar)
  if (isCheckingAuth) return null;

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ openSignin: true }} />;
  }

  return children;
}

export default ProtectedRoute;