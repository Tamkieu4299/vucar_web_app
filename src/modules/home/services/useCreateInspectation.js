import { useMutation } from "react-query";
import request from "../../../utils/request";

function useCreateInspectation(options) {
  return useMutation(
    ({body}) => request.post("inspectation/create", body),
    options
  );
}

export default useCreateInspectation;
