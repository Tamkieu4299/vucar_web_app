import { useMutation } from "react-query";
import request from "@/utils/request";

function useCreatePlaylist(options) {
  return useMutation((data) => request.post("/playlist/create", data), options);
}

export default useCreatePlaylist;
