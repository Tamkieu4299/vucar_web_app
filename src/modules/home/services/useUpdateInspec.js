import { useMutation } from "react-query";
import request from "../../../utils/request";

function useUpdateInspec(options) {
  return useMutation(
    ({ id, body }) => request.put(`inspectation/update/${id}`, body),
    options
  );
}

export default useUpdateInspec;
