import { Row, Space } from "antd";
import PropTypes from "prop-types";

function ModalFooterContainer({ items = [] }) {
  return (
    <Row className="justify-end">
      {items.length === 1 ? (
        <>
          <Space key="0">
            <div />
          </Space>
          <Space key="1">{items[0]}</Space>
        </>
      ) : (
        items.map((item, index) => <Space key={index}>{item}</Space>)
      )}
    </Row>
  );
}

ModalFooterContainer.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ModalFooterContainer;
