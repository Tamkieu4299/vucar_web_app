import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchInspectation(id, options) {
  return useQuery(["inspectation"], () => request.get(`inspectation/get-inspec/${id}`), {
    ...options,
  });
}

export default useFetchInspectation;
