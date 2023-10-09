import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { useCallback, useMemo, useState } from "react";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import { TEXT } from "../../../../localization/en";
import ModalDetailAudio from "../../components/ModalDetail";
import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import useCreateAudio from "../../services/useCreateAudio";
import { displaySuccessMessage } from "../../../../utils/request";
import useFetchAllAudio from "../../services/useFetchAllAudio";
import useFetchAudio from "../../services/useFetchAudio";
import useDeleteAudio from "../../services/useDeleteAudio";
import useModal from "../../../../hooks/useModal";
import { useSearchParams } from "react-router-dom";
import SearchDriver from "../../../driver/features/components/Search";
import { Button, Col, Row, Typography } from "antd";
import useUpdateAudio from "../../services/useUpdateAudio";
import usePermission from "../../../../hooks/usePermission";
import { getLocalStorage } from "../../../../utils/storage";

function AudioPage() {
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const { editPermission } = usePermission();
  const param = searchParams.get("name") || "";
  const user = getLocalStorage("tempUser");

  const [modalDetailId, setModalDetailId] = useState(null);
  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  //Title modal
  const title = useMemo(() => {
    if (isNew) return `${TEXT.button.addNew} ${TEXT.audio.audio}`;
    if (isEdit) return `${TEXT.button.edit} ${TEXT.audio.audio}`;
    return "";
  }, [isEdit, isNew]);

  //handle Modal
  const handleOpenDetail = useCallback((id = -1) => setModalDetailId(id), []);

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    form.resetFields();
  }, [form]);
  const { data: listAudio, isLoading, refetch } = useFetchAllAudio({});

  const { isLoading: isFetchAudio } = useFetchAudio(modalDetailId, {
    enabled: Boolean(modalDetailId && modalDetailId !== -1),
    onSuccess: (rs) => {
      form.setFieldsValue(rs);
    },
  });

  const { mutateAsync: deleteAudio } = useDeleteAudio({
    onSuccess: () => {
      displaySuccessMessage(TEXT.message.delete_success);
      refetch();
      onCloseModal();
    },
  });

  const { openModalDelete, onCloseModal } = useModal({
    onDeleteOk: deleteAudio,
  });

  const { mutateAsync: createAudio, isLoading: isCreate } = useCreateAudio({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const { mutateAsync: updateAudio, isLoading: isUpdate } = useUpdateAudio({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.update_success);
    },
  });

  const onSubmit = async () => {
    const value = form.getFieldValue();
    const userName = user?.name;

    if (isNew) {
      const payload = { name: value.name, model: value.model };
      await createAudio({ body: payload });
    }
  };
  const onSearch = () => {
    refetch();
  };
  return (
    <>
      <Row>
        <Col span={1} className="text-right pb-4">
          {
            <Button className="bg-primary" onClick={() => handleOpenDetail()}>
              <Typography className="text-white">
                {TEXT.button.addNew}
              </Typography>
            </Button>
          }
        </Col>
      </Row>

      <TableAudio
        loading={isLoading}
        columns={columns({
          handleOpenDetail,
        })}
        dataSource={listAudio}
        rowKey="id"
        // rowSelection={rowSelection}
      />
      <ModalContainer
        title={title}
        loading={isFetchAudio}
        open={!!modalDetailId}
        onOk={() => form.submit()}
        confirmLoading={isCreate || isUpdate}
        okText={TEXT.button.ok}
        onCancel={onCancel}
        // okButtonProps={{ disabled: !editPermission, className: "bg-primary" }}
        cancelText={TEXT.button.cancel}
        width={600}
      >
        <ModalDetailAudio form={form} onSubmit={onSubmit} isNew={isNew} />
      </ModalContainer>
    </>
  );
}

export default AudioPage;
