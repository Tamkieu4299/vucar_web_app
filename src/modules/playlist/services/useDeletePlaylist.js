import { useMutation } from "react-query";
import request from "@/utils/request";

function useDeletePlaylist(options) {
  return useMutation(
    (id) => request.post(`playlist/soft-delete/${id}`),
    options
  );
}

export default useDeletePlaylist;
