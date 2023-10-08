import PropTypes from "prop-types";
import ModalDelete from "./ModalDelete";
import { memo } from "react";
import { useSelector } from "react-redux";
import { modalSelector } from "../../stores/reducers/modalSlice";

function AppModal({ children }) {
  const { recordModalDelete, contentModalDelete, onOk, onCancel } =
    useSelector(modalSelector);

  return (
    <>
      {children}
      <ModalDelete
        open={!!recordModalDelete}
        content={contentModalDelete}
        onOk={onOk}
        onClose={onCancel}
      />
    </>
  );
}
AppModal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default memo(AppModal);
