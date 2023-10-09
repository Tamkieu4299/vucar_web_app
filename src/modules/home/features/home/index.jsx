import { Button, Col } from "antd";
import TableInQuery from "../../components/TableInquery";
import { columns } from "../../components/items";
import useFetchAllInspectation from "../../services/useFetchAllInspectation";
import SearchDriver from "../../../driver/features/components/Search";
import { useSearchParams } from "react-router-dom";
import useUpdateStatus from "../../services/useUpdateStatus";
import { displaySuccessMessage } from "../../../../utils/request";
import { TEXT } from "../../../../localization/en";
import { FormProvider } from "antd/es/form/context";
import ModalContainer from "../../../../components/Modal/containers/ModalContainer";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "antd/es/form/Form";
import ModalInquiryDetail from "../../components/ModalDetail";
import useFetchInspectation from "../../services/useFetchInspectation";

function HomePage() {
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const [modalDetailId, setModalDetailId] = useState(null);

  const handleOpenDetail = useCallback((id) => setModalDetailId(id), []);
  const onCancel = useCallback(() => setModalDetailId(null), []);

  const footer = useMemo(() => {
    return [
      <Button key="cancel" onClick={onCancel}>
        {TEXT.button.cancel}
      </Button>,
    ];
  }, [onCancel]);

  const {
    data: listInQuery,
    isLoading,
    refetch,
  } = useFetchAllInspectation({});

  const { mutateAsync: updateStatus } = useUpdateStatus({
    onSuccess: () => {
      refetch();
      displaySuccessMessage(TEXT.message.update_success);
    },
  });

  const { loading } = useFetchInspectation(modalDetailId, {
    enabled: Boolean(modalDetailId),
    onSuccess: (rs) => {
      form.setFieldsValue(rs.stats);
    },
  });

  const handleUpdateStatus = (id, status) => {
    updateStatus({
      id,
      body: {
        status,
      },
    });
  };

  const onSearch = () => {
    refetch();
  };

  return (
    <>
      {/* <Col span={24}>
        <SearchDriver onSearch={onSearch} />
      </Col> */}

      <TableInQuery
        columns={columns({ handleUpdateStatus, handleOpenDetail })}
        dataSource={listInQuery}
        loading={isLoading}
      />

      <FormProvider>
        <ModalContainer
          title={TEXT.inquiry.view}
          open={!!modalDetailId}
          loading={loading}
          width={800}
          footer={footer}
          onCancel={onCancel}
        >
          { <ModalInquiryDetail form={form} />}
        </ModalContainer>
      </FormProvider>
    </>
  );
}

export default HomePage;
