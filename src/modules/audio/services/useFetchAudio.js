import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAudio(id, options) {
  return useQuery(["inspectation"], () => request.get(`car/get-car/${id}`), {
    ...options,
  });
}

export default useFetchAudio;
