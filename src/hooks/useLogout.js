import { useNavigate } from "react-router";
import { removeLocalStorage } from "../utils/storage";

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    removeLocalStorage("tempUser");
    navigate("/auth/login");
  };

  return { logout };
}

export default useLogout;
