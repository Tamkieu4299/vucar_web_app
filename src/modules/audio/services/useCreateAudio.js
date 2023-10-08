import { useMutation } from "react-query";
import request from "../../../utils/request";

function useCreateAudio(options) {
  return useMutation(
    (data) =>
      request.post("audio/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    options
  );
}

export default useCreateAudio;
