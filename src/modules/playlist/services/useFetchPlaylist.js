import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchPlaylist(id, options) {
  return useQuery(["playlist"], () => request.get(`playlist/get/${id}`), {
    ...options,
  });
}

export default useFetchPlaylist;
