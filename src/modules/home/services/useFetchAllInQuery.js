import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllInQuery(param = "", options) {
  return useQuery(
    ["inQueries"],
    () => request.get(`inquiry/search/${param}`),
    options
  );
}

export default useFetchAllInQuery;
