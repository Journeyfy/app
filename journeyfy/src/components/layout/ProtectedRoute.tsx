import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Role } from "../../enums/roles";
import { userInfoSelector } from "../../utils/selectors";
import _ from "lodash";

interface Props {
  readonly allowedRoles: Role[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const user = userInfoSelector();

  if (user == null || !_.includes(allowedRoles, user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
