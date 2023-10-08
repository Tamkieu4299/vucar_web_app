import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllPlaylist(param = "", options = {}) {
  return useQuery(
    ["playlists"],
    () => request.get(`playlist/search/${param}`),
    options
  );
}

export default useFetchAllPlaylist;
