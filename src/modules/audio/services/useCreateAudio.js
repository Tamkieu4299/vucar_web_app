import { useMutation } from "react-query";
import request from "../../../utils/request";

function useCreateAudio(options) {
  return useMutation(
    ({body}) =>
      request.post("car/create", body),
    options
  );
}

export default useCreateAudio;
