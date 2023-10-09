import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllInspectation(options) {
  return useQuery(
    ["inspectations"],
    () => request.get("/inspectation/"),
    options
  );
}

export default useFetchAllInspectation;
