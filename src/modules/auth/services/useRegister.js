import { useMutation } from "react-query";
import request from "../../../utils/request";

function useRegister(options) {
  return useMutation(
    async (data) => await request.post("auth/register", data),
    options
  );
}
export default useRegister;
