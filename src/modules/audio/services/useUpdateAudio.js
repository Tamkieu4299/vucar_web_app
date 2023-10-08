import { useMutation } from "react-query";
import request from "../../../utils/request";

function useUpdateAudio(options) {
  return useMutation(
    ({ id, body }) => request.put(`audio/update/${id}`, body),
    options
  );
}

export default useUpdateAudio;
