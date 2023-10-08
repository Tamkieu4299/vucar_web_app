import { Col, Input } from "antd";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function SearchDriver({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = async (params) => {
    await setSearchParams(`name=${params}`);
    onSearch();
  };

  const value = searchParams.get("name");

  return (
    <Col span={12}>
      <Input.Search
        allowClear
        defaultValue={value}
        placeholder="Filter by name"
        enterButton
        className="bg-primary rounded-lg mb-2"
        onSearch={search}
      />
    </Col>
  );
}

SearchDriver.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchDriver;
