import { Button, Col } from "antd";
import TableInQuery from "../../components/TableInquery";
import { columns } from "../../components/items";
import useFetchAllInQuery from "../../services/useFetchAllInQuery";
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
import useFetchInquiry from "../../services/useFetchInquiry";

function HomePage() {
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const inQueryParam = searchParams.get("name") ?? "";
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
  } = useFetchAllInQuery(inQueryParam, {});

  const { mutateAsync: updateStatus } = useUpdateStatus({
    onSuccess: () => {
      refetch();
      displaySuccessMessage(TEXT.message.update_success);
    },
  });

  const { loading } = useFetchInquiry(modalDetailId, {
    enabled: Boolean(modalDetailId),
    onSuccess: (rs) => {
      form.setFieldsValue(rs);
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
      <Col span={24}>
        <SearchDriver onSearch={onSearch} />
      </Col>

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
        >
          <ModalInquiryDetail form={form} />
        </ModalContainer>
      </FormProvider>
    </>
  );
}

export default HomePage;
