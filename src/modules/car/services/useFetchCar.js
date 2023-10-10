import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchCar(id, options) {
  return useQuery(["inspectation"], () => request.get(`car/get-car/${id}`), {
    ...options,
  });
}

export default useFetchCar;
