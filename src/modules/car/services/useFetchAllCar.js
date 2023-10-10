import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchAllCar(options) {
  return useQuery(
    ["inspectations"],
    () => request.get("car/"),
    options
  );
}

export default useFetchAllCar;
