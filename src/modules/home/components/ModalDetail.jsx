import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";
import useFetchCriteriaForm from "../services/useFetchCriteriaForm";
import useFetchInspectation from "../services/useFetchInspectation";
import useUpdateInspec from "../services/useUpdateInspec";
import SelectStatus from "./SelectStatus";
import { useState, useMemo } from "react";
import { getLocalStorage } from "../../../utils/storage";
function ModalInquiryDetail({
  id,
  form,
  onSubmit,
  onCreate,
  stats,
  isNew,
  listCriterias,
}) {
  const user = getLocalStorage("tempUser");
  const [currentStats, setCurrentStats] = useState(stats);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [carId, setCarId] = useState(null);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // const { data: listCriterias, isLoading, refetch } = useFetchCriteriaForm({});
  const [isChanged, setIsChanged] = useState(false);
  const handleNextPage = () => {
    end + 5 <= Object.keys(listCriterias).length &&
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    start - 5 >= 0 && setCurrentPage(currentPage - 1);
  };

  const changeJSONStatsStatus = (fieldName, status) => {
    (!isNew ? stats : listCriterias)[fieldName]["status"] = status === "true";
    if (status === "true")
      (!isNew ? stats : listCriterias)[fieldName]["note"] = "";
    setIsChanged(!isChanged);
  };

  const changeJSONStatsNote = (fieldName, note) => {
    (!isNew ? stats : listCriterias)[fieldName]["note"] = note;
  };

  const CustomObjectDisplay = ({ fieldName }) => {
    const data = !isNew ? stats[fieldName] : listCriterias[fieldName];
    return data === undefined ? (
      <></>
    ) : (
      <Form.Item name={fieldName} key={fieldName} className="w-full">
        <h1 className="">{fieldName}</h1>
        <div>
          <SelectStatus
            id={fieldName}
            status={String(data["status"])}
            handleClick={changeJSONStatsStatus}
          />
          {!data["status"] && (
            <Input
              placeholder={data["note"]}
              className="ml-2 w-3/4 h-1/2"
              onChange={(e) => changeJSONStatsNote(fieldName, e.target.value)}
            />
          )}
        </div>
      </Form.Item>
    );
  };

  const items = useMemo(() => {
    return (
      stats &&
      Object.keys(listCriterias)
        .slice(start, end)
        .map((fieldName) => <CustomObjectDisplay fieldName={fieldName} />)
    );
  }, [currentPage, listCriterias, isChanged, stats]);

  console.log(isNew);
  console.log(listCriterias);
  console.log(stats);

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      style={{
        maxWidth: 800,
      }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      {isNew && (
        <Form.Item label={"Car ID"} className="w-full">
          <Input
            className="w-1/2 h-1/2"
            onChange={(e) => setCarId(Number(e.target.value))}
          ></Input>
        </Form.Item>
      )}
      {items}
      <Form.Item>
        <Button
          onClick={() => {
            !isNew
              ? onSubmit(id, stats)
              : onCreate(user?.user_id, carId, listCriterias);
          }}
        >
          Save
        </Button>
        <Button
          style={{ marginLeft: "8px" }}
          onClick={() => {
            handlePrevPage();
          }}
        >
          Back
        </Button>
        <Button
          style={{ marginLeft: "8px" }}
          onClick={() => {
            handleNextPage();
          }}
        >
          Next
        </Button>
        <span className="ml-[8px]">
          {`${start} - ${end} / ${Object.keys(listCriterias).length}`}
        </span>
      </Form.Item>
    </Form>
  );
}
ModalInquiryDetail.propTypes = {
  id: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  stats: PropTypes.any.isRequired,
  listCriterias: PropTypes.any.isRequired,
};
export default ModalInquiryDetail;
