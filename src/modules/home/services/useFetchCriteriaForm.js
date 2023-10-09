import { useQuery } from "react-query";
import request from "../../../utils/request";

function useFetchCriteriaForm(options) {
  return useQuery(["inspectationForm"], () => request.get("inspectation/get-criterias"), {
    options,
  });
}

export default useFetchCriteriaForm;
