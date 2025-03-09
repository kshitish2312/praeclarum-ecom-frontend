import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  return { isAuthenticated, role: user?.role || null };
};
