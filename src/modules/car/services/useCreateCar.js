import { useMutation } from "react-query";
import request from "../../../utils/request";

function useCreateCar(options) {
  return useMutation(
    ({body}) =>
      request.post("car/create", body),
    options
  );
}

export default useCreateCar;
