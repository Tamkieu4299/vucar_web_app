import { trimParams } from "@/utils/util";
import LoginForm from "../../components/LoginForm";
import useLogin from "../../services/useLogin";
import { setLocalStorage } from "@/utils/storage";
import { displaySuccessMessage } from "@/utils/request";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const { mutateAsync: loginUser, isLoading } = useLogin({
    onSuccess: async (rs) => {
      await setLocalStorage("tempUser", rs.data);
      displaySuccessMessage(rs.message);
      navigate("/");
    },
  });

  const onSubmit = async (data) => {
    await loginUser(trimParams(data));
  };

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
}

export default Login;
