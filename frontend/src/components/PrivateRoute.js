import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (e) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
