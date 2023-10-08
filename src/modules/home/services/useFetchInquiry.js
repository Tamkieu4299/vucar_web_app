import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchInquiry(id, options) {
  return useQuery(["inquiry"], () => request.get(`inquiry/get/${id}`), {
    ...options,
  });
}

export default useFetchInquiry;
