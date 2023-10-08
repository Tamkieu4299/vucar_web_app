import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllDriver(param = "", options) {
  return useQuery(
    ["drivers"],
    () => request.get(`user/search/${param}`),
    options
  );
}

export default useFetchAllDriver;
