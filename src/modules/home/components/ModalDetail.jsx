import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";
import useFetchCriteriaForm from "../services/useFetchCriteriaForm";
import useFetchInspectation from "../services/useFetchInspectation";
import SelectStatus from "./SelectStatus";
import { useState } from "react";
function ModalInquiryDetail({ form, onSubmit }) {
  const [criterias, setCriterias] = useState({});

  const { data: listCriterias, isLoading, refetch } = useFetchCriteriaForm({});

  const CustomObjectDisplay = ({ fieldName }) => {
    const data = form.getFieldValue(fieldName);
    return data === undefined ? (
      <></>
    ) : (
        <Form.Item name={fieldName} label={fieldName} key={fieldName} className="w-full flex-row">
          <div className="">
            <SelectStatus status={String(data["status"])}/>
            {!data["status"] && <Input placeholder={data["note"]}/>}
          </div>
        </Form.Item>
    );
  };

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
      {!isLoading &&
        Object.keys(listCriterias).map((fieldName) => (
            <CustomObjectDisplay fieldName={fieldName} />
        ))}
    </Form>
  );
}
ModalInquiryDetail.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // options: PropTypes.array.isRequired,
};
export default ModalInquiryDetail;
