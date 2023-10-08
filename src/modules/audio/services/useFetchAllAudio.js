import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllAudio(param = "", options) {
  return useQuery(
    ["audios"],
    () => request.get(`audio/search/${param}`),
    options
  );
}

export default useFetchAllAudio;
