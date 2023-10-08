import { useMutation } from "react-query";
import request from "../../../utils/request";

function useUpdatePlaylist(options) {
  return useMutation(
    ({ id, body }) => request.put(`playlist/update/${id}`, body),
    options
  );
}

export default useUpdatePlaylist;
