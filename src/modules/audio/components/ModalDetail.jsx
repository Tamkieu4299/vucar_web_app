import { Button, Form, Input, Upload } from "antd";
import PropTypes from "prop-types";
import { initAudioValues } from "./items";
import { TEXT } from "../../../localization/en";
import { checkFile } from "../../../utils/util";
import { UploadOutlined } from "@ant-design/icons";
function ModalDetailAudio({ form, onSubmit, isNew }) {
  const label = TEXT.audio;
  const required = TEXT.required;
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 24 }}
      style={{
        maxWidth: 600,
      }}
      initialValues={initAudioValues}
    >
      {!isNew && <Form.Item
        name="car_id"
        label="ID"
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <Input />
      </Form.Item>}
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <Input />
      </Form.Item>

    </Form>
  );
}
ModalDetailAudio.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
  isNew: PropTypes.bool,
};

export default ModalDetailAudio;
