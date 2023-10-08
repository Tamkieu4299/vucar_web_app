import { useMutation } from "react-query";
import request from "../../../utils/request";

function useDeleteDriver(options) {
  return useMutation((id) => request.post(`user/soft-delete/${id}`), options);
}

export default useDeleteDriver;
