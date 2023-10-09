import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";
import useFetchCriteriaForm from "../services/useFetchCriteriaForm";
import useFetchInspectation from "../services/useFetchInspectation";
import SelectStatus from "./SelectStatus";
import { useState, useMemo } from "react";
function ModalInquiryDetail({ form, onSubmit }) {
  const [criterias, setCriterias] = useState({});
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const { data: listCriterias, isLoading, refetch } = useFetchCriteriaForm({});

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleNextPage = () => {
    end + 5 <= Object.keys(listCriterias).length &&
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    start - 5 >= 0 && setCurrentPage(currentPage - 1);
  };

  const CustomObjectDisplay = ({ fieldName }) => {
    const data = form.getFieldValue(fieldName);
    return data === undefined ? (
      <></>
    ) : (
      <Form.Item
        name={fieldName}
        label={fieldName}
        key={fieldName}
        className="w-full flex-row"
      >
        <SelectStatus status={String(data["status"])} />
        {!data["status"] && <Input placeholder={data["note"]} />}
      </Form.Item>
    );
  };

  const items = useMemo(() => {
    return (
      !isLoading &&
      Object.keys(listCriterias)
        .slice(start, end)
        .map((fieldName) => <CustomObjectDisplay fieldName={fieldName} />)
    );
  }, [currentPage, listCriterias, start, end, isLoading]);

  console.log(listCriterias);
  console.log(items);
  
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
      {items}
      <Form.Item>
        <Button
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
          {!isLoading &&
            `${start} - ${end} / ${Object.keys(listCriterias).length}`}
        </span>
      </Form.Item>
    </Form>
  );
}
ModalInquiryDetail.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // options: PropTypes.array.isRequired,
};
export default ModalInquiryDetail;
