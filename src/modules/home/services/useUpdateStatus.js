import { useMutation } from "react-query";
import request from "../../../utils/request";

function useUpdateStatus(options) {
  return useMutation(
    ({ id, body }) => request.put(`inquiry/update/${id}`, body),
    options
  );
}

export default useUpdateStatus;
