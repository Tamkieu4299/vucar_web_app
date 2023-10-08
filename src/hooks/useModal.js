import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  onModalCancel,
  onOpenModalDelete,
} from "../stores/reducers/modalSlice";
import { noop } from "lodash";

const initialAction = {
  recordModalDelete: null,
  contentModalDelete: null,
  onDeleteOk: (_record, close) => close(),
  onCancelModal: (close) => close(),
};

function useModal(action = initialAction) {
  const dispatch = useDispatch();

  const _action = useRef(noop);
  _action.current = { ...initialAction, ...action };

  const onCloseModal = useCallback(() => {
    dispatch(onModalCancel());
    return true;
  }, [dispatch]);

  const openModalDelete = useCallback(
    (record, content) => {
      dispatch(
        onOpenModalDelete({
          recordModalDelete: record,
          contentModalDelete: content,
          onOk: () => {
            _action?.current.onDeleteOk(record, onCloseModal);
          },
          onCancel: () => {
            _action?.current.onCancelModal(onCloseModal);
          },
        })
      );

      return true;
    },
    [dispatch, onCloseModal]
  );

  return { onCloseModal, openModalDelete };
}

export default useModal;
