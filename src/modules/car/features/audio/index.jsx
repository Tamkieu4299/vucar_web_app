import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { useCallback, useMemo, useState } from "react";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import { TEXT } from "../../../../localization/en";
import ModalDetailCar from "../../components/ModalDetail";
import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import useCreateCar from "../../services/useCreateCar";
import { displaySuccessMessage } from "../../../../utils/request";
import useFetchAllCar from "../../services/useFetchAllCar";
import useFetchCar from "../../services/useFetchCar";
import useModal from "../../../../hooks/useModal";
import { useSearchParams } from "react-router-dom";
import SearchDriver from "../../../driver/features/components/Search";
import { Button, Col, Row, Typography } from "antd";
import usePermission from "../../../../hooks/usePermission";
import { getLocalStorage } from "../../../../utils/storage";

function CarPage() {
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const { editPermission } = usePermission();
  const param = searchParams.get("name") || "";
  const user = getLocalStorage("tempUser");

  const [modalDetailId, setModalDetailId] = useState(null);
  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  //Title modal
  const title = useMemo(() => {
    if (isNew) return `Add new car`;
    if (isEdit) return `View car`;
    return "";
  }, [isEdit, isNew]);

  //handle Modal
  const handleOpenDetail = useCallback((id = -1) => setModalDetailId(id), []);

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    form.resetFields();
  }, [form]);
  const { data: listCar, isLoading, refetch } = useFetchAllCar({});

  const { isLoading: isFetchCar } = useFetchCar(modalDetailId, {
    enabled: Boolean(modalDetailId && modalDetailId !== -1),
    onSuccess: (rs) => {
      form.setFieldsValue(rs);
    },
  });

  const { mutateAsync: createCar, isLoading: isCreate } = useCreateCar({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const onSubmit = async () => {
    const value = form.getFieldValue();
    const userName = user?.name;

    if (isNew) {
      const payload = { name: value.name, model: value.model };
      await createCar({ body: payload });
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
        dataSource={listCar}
        rowKey="id"
      />
      <ModalContainer
        title={title}
        loading={isFetchCar}
        open={!!modalDetailId}
        onOk={() => form.submit()}
        confirmLoading={isCreate}
        okText={TEXT.button.ok}
        onCancel={onCancel}
        okButtonProps={{ disabled: !editPermission, className: "bg-primary" }}
        cancelText={TEXT.button.cancel}
        width={600}
      >
        <ModalDetailCar form={form} onSubmit={onSubmit} isNew={isNew} />
      </ModalContainer>
    </>
  );
}

export default CarPage;
