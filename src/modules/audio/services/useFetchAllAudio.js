import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllAudio(options) {
  return useQuery(
    ["inspectations"],
    () => request.get("car/"),
    options
  );
}

export default useFetchAllAudio;
