import { noop } from "lodash";
import PropTypes from "prop-types";
import { TEXT } from "../../localization/en";
import ModalContainer from "./containers/ModalContainer";

function ModalDelete({ open, content, onClose = noop, onOk = noop }) {
  return (
    <ModalContainer
      open={open}
      onOk={onOk}
      onCancel={onClose}
      okText={TEXT.button.ok}
    >
      {content ?? TEXT.confirm.confirm_delete}
    </ModalContainer>
  );
}
ModalDelete.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.string,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};
export default ModalDelete;
