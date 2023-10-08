import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";
import SelectStatus from "./SelectStatus";

function ModalInquiryDetail({ form, onSubmit }) {
  const label = TEXT.inquiry;

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item name="driver_name" label={label.name}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="driver_phone" label={label.phone}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="bank_account" label={label.bank_account}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="bank_name" label={label.bank_name}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="point" label={label.point}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="description" label={label.description}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="status" label={label.status}>
        <SelectStatus status={form.getFieldValue("status")} disabled />
      </Form.Item>
    </Form>
  );
}
ModalInquiryDetail.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
export default ModalInquiryDetail;
