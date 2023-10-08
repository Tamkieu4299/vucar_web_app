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
      <Form.Item
        name="audio_name"
        label={label.audio_name}
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {isNew && (
        <Form.Item
          name="file"
          label={label.file}
          rules={[
            {
              required: true,
              message: required.is_required,
            },
          ]}
        >
          <Upload
            name="file"
            customRequest={(options) => {
              options.onSuccess("Ok");
            }}
            multiple={true}
            showUploadList={true}
            beforeUpload={checkFile}
            onChange={form.onChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      )}
    </Form>
  );
}
ModalDetailAudio.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
  isNew: PropTypes.bool,
};

export default ModalDetailAudio;
