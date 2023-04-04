import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { createSelector } from "reselect";

const getDecodedAccessToken = createSelector(
  (state) => state?.auth,
  (auth) => (!auth.accessToken ? "" : jwt_decode(auth?.accessToken))
);

const ProtectedRoutes = ({ redirectPath, children, authorizedFor }) => {
  const decodedToken = useSelector(getDecodedAccessToken);
  if (decodedToken.aut !== authorizedFor.find((role) => role === "ADMIN")) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children ? children : <Outlet />;
  }
};

export default ProtectedRoutes;
