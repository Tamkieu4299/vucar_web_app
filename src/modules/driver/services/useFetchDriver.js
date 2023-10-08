import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchDriver(id, options) {
  return useQuery(["driver"], () => request(`user/get-user/${id}`), options);
}

export default useFetchDriver;
