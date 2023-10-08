import { Modal } from "antd";
import { noop } from "lodash";
import PropTypes from "prop-types";

function ModalContainer({
  destroyOnClose = true,
  open = false,
  onCancel = noop,
  children,
  ...rest
}) {
  return (
    <Modal
      destroyOnClose={destroyOnClose}
      onCancel={onCancel}
      open={open}
      maskClosable={false}
      style={{ margin: "24px" }}
      centered
      okButtonProps={{ className: "bg-primary" }}
      {...rest}
    >
      {children}
    </Modal>
  );
}

ModalContainer.propTypes = {
  destroyOnClose: PropTypes.bool,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default ModalContainer;
