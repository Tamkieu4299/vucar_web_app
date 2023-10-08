import { Col, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import PropTypes from "prop-types";

function SearchAudio({ onSearch }) {
  const [form] = useForm();

  const searchAudio = () => {
    onSearch();
  };

  return (
    <Col span={8}>
      <Form form={form}>
        <Form.Item name="search_audio">
          <Input.Search
            allowClear
            placeholder="Filter by name"
            enterButton
            className="bg-primary rounded-lg mb-2"
            onSearch={searchAudio}
          />
        </Form.Item>
      </Form>
    </Col>
  );
}
SearchAudio.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchAudio;
