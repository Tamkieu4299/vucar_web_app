import { useNavigate } from "react-router";
import { displaySuccessMessage } from "@/utils/request";
import { trimParams } from "@/utils/util";
import RegisterForm from "../../components/RegisterForm";
import useRegister from "../../services/useRegister";

function Register() {
  const navigate = useNavigate();
  const { mutateAsync: register, isLoading } = useRegister({
    onSuccess: (rs) => {
      displaySuccessMessage(rs.message);
      navigate("/auth/login");
    },
  });

  const onSubmit = async (data) => {
    await register(trimParams(data));
  };

  return (
    <>
      <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
}
export default Register;
