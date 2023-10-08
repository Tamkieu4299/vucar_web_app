import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAudio(id, options) {
  return useQuery(["audio"], () => request.get(`audio/get/${id}`), {
    ...options,
  });
}

export default useFetchAudio;
