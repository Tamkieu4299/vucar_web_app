import { useMutation } from "react-query";
import request from "../../../utils/request";

function useDeleteAudio(options) {
  return useMutation((id) => request.post(`audio/soft-delete/${id}`), options);
}

export default useDeleteAudio;
