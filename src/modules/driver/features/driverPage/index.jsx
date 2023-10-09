import { FormProvider } from "antd/es/form/context";
import TableDriver from "../../components/TableDriver";
import ModalDriverDetail from "../../components/ModalDriverDetail";
import useFetchAllDriver from "../../services/useFetchAllDriver";
import { columns } from "../../components/items";
import { useForm } from "antd/es/form/Form";
import { useCallback, useState } from "react";
import ModalContainer from "../../../../components/Modal/containers/ModalContainer";
import { TEXT } from "../../../../localization/en";
import useFetchAllPlaylist from "../../../playlist/services/useFetchAllPlaylist";
import useFetchDriver from "../../services/useFetchDriver";
import useUpdateDriver from "../../services/useUpdateDriver";
import { displaySuccessMessage } from "../../../../utils/request";
import useModal from "../../../../hooks/useModal";
import useDeleteDriver from "../../services/useDeleteDriver";
import SearchDriver from "../components/Search";
import { useSearchParams } from "react-router-dom";
import usePermission from "../../../../hooks/usePermission";

function DriverPage() {
  const [form] = useForm();
  const [modalDetailId, setModalDetailId] = useState(null);
  const [searchParams] = useSearchParams();
  const param = searchParams.get("name") || "";
  const { editPermission } = usePermission();
  const handleOpenDetail = useCallback((id) => setModalDetailId(id), []);

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    form.resetFields();
  }, [form]);

  const {
    data: listDriver,
    isLoading: loadingListDriver,
    refetch,
  } = useFetchAllDriver(param, {});

  // const { data: listPlaylist } = useFetchAllPlaylist();

  const { isLoading: loadingDriver } = useFetchDriver(modalDetailId, {
    enabled: Boolean(modalDetailId),
    onSuccess: (rs) => {
      const { data } = rs;
      form.setFieldsValue({
        ...data,

        playlist_id: {
          label: data.playlist_id?.playlist_name,
          value: data.playlist_id?.playlist_id,
        },
      });
    },
  });

  const { mutateAsync: deleteDriver } = useDeleteDriver({
    onSuccess: () => {
      displaySuccessMessage(TEXT.message.update_success);
      refetch();
      onCloseModal();
    },
  });

  const { openModalDelete, onCloseModal } = useModal({
    onDeleteOk: deleteDriver,
  });

  const { mutateAsync: updateDriver, isLoading: isUpdate } = useUpdateDriver({
    onSuccess: () => {
      displaySuccessMessage(TEXT.message.update_success);
      refetch();
      onCancel();
    },
  });

  const onSubmit = () => {
    const value = form.getFieldsValue();
    updateDriver({
      id: modalDetailId,
      body: {
        ...value,
        playlist_id: value.playlist_id.value ?? value.playlist_id,
      },
    });
  };

  const onSearch = () => {
    refetch();
  };

  return (
    <>
      <SearchDriver onSearch={onSearch} />
      <TableDriver
        loading={loadingListDriver}
        dataSource={listDriver}
        columns={columns({
          handleOpenDetail,
          handleOpenDelete: openModalDelete,
        })}
        rowKey="user_id"
      />
      {/* <FormProvider>
        <ModalContainer
          title={TEXT.common.edit("Driver")}
          open={!!modalDetailId}
          onOk={() => form.submit()}
          confirmLoading={isUpdate}
          okText={TEXT.button.ok}
          onCancel={onCancel}
          okButtonProps={{ disabled: !editPermission, className: "bg-primary" }}
          cancelText={TEXT.button.cancel}
          width={800}
        >
          <ModalDriverDetail
            form={form}
            onSubmit={onSubmit}
            loading={loadingDriver}
          />
        </ModalContainer>
      </FormProvider> */}
    </>
  );
}

export default DriverPage;
