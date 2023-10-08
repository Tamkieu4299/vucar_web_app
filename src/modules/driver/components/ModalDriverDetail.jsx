import { Form, Input } from "antd";
import { initialDriverValues } from "./items";
import PropTypes from "prop-types";
import { TEXT } from "../../../localization/en";
import CustomSelect from "../../../components/Select";

function ModalDriverDetail({ form, onSubmit, options }) {
  const label = TEXT.driver;
  const required = TEXT.required;

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={initialDriverValues}
    >
      <Form.Item name="name" label={label.name}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="phone" label={label.phone}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="gender" label={label.gender}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="DOB" label={label.DOB}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="citizen_id" label={label.citizen}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="brand" label={label.brand}>
        <Input disabled />
      </Form.Item>
      <Form.Item name="car" label={label.car}>
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="playlist_id"
        label={label.playlist}
        rules={[
          {
            required: true,
            message: required.is_required,
          },
        ]}
      >
        <CustomSelect
          placeholder={TEXT.playlist.playlist}
          options={options.map(
            ({ playlist_id, playlist_name, number_of_songs, total_time }) => ({
              label: playlist_name,
              value: playlist_id,
              disabled: number_of_songs === 0 || total_time === 0,
            })
          )}
        />
      </Form.Item>
    </Form>
  );
}
ModalDriverDetail.propTypes = {
  form: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
export default ModalDriverDetail;
