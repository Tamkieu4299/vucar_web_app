import { Form, Input } from "antd";
import PropTypes from "prop-types";
import CustomSelect from "../../../components/Select";
import { LABEL, TEXT } from "../../../localization/en";
import TableAudio from "../../car/components/TableAudio";
import { audiosColumn, initialPlaylistValue } from "./items";
import "./styles.scss";
function ModalDetailPlaylist({
  form,
  onSubmit,
  options,
  handleChangeAudio,
  handleDeleteItem,
  audioChecked,
}) {
  const label = TEXT.playlist;
  const required = TEXT.required;

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 8 }}
        style={{
          maxWidth: 800,
        }}
        onFinish={onSubmit}
        autoComplete="off"
        initialValues={initialPlaylistValue}
      >
        <Form.Item
          name="playlist_name"
          label={label.playlist_name}
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
          name="playlist_description"
          label={label.playlist_description}
          rules={[
            {
              required: true,
              message: required.is_required,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="audio_ids" label={LABEL.audio}>
          <CustomSelect
            mode="multiple"
            placement="topLeft"
            maxTagCount={0}
            placeholder={TEXT.audio.audio}
            onChange={(_v, e) => handleChangeAudio(e)}
            options={options.map(({ audio_id, audio_name, durations }) => ({
              label: audio_name,
              value: audio_id,
              des: durations,
            }))}
          />
        </Form.Item>
      </Form>
      <TableAudio
        columns={audiosColumn({
          handleDelete: handleDeleteItem,
        })}
        pageSize={5}
        dataSource={audioChecked}
        scroll={700}
      />
    </>
  );
}
ModalDetailPlaylist.propTypes = {
  form: PropTypes.any,
  onSubmit: PropTypes.func,
  options: PropTypes.array,
  handleChangeAudio: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  audioChecked: PropTypes.array,
};

export default ModalDetailPlaylist;
