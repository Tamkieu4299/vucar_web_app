import { Button, Col, Typography } from "antd";
import TableInQuery from "../../components/TableInquery";
import { columns } from "../../components/items";
import useFetchAllInspectation from "../../services/useFetchAllInspectation";
import SearchDriver from "../../../driver/features/components/Search";
import useUpdateInspec from "../../services/useUpdateInspec";
import { useSearchParams } from "react-router-dom";
import { displaySuccessMessage } from "../../../../utils/request";
import { TEXT } from "../../../../localization/en";
import { FormProvider } from "antd/es/form/context";
import ModalContainer from "../../../../components/Modal/containers/ModalContainer";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "antd/es/form/Form";
import ModalInquiryDetail from "../../components/ModalDetail";
import useFetchInspectation from "../../services/useFetchInspectation";
import useFetchCriteriaForm from "../../services/useFetchCriteriaForm";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import useCreateInspectation from "../../services/useCreateInspectation";
function HomePage() {
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const [modalDetailId, setModalDetailId] = useState(null);
  const [stats, setStats] = useState({});
  // const handleOpenDetail = useCallback((id) => setModalDetailId(id), []);
  const onCancel = useCallback(() => setModalDetailId(null), []);
  const { isNew, isEdit } = useDetailActionType(modalDetailId);
  //handle Modal
  const handleOpenDetail = useCallback((id = -1) => setModalDetailId(id), []);

  const footer = useMemo(() => {
    return [
      <Button key="cancel" onClick={onCancel}>
        {TEXT.button.cancel}
      </Button>,
    ];
  }, [onCancel]);

  const { data: listInQuery, isLoading, refetch } = useFetchAllInspectation({});

  const { mutateAsync: updateStatus } = useUpdateInspec({
    onSuccess: () => {
      refetch();
      displaySuccessMessage(TEXT.message.update_success);
    },
  });

  const { mutateAsync: createStatus } = useCreateInspectation({
    onSuccess: () => {
      refetch();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });
  const { data: listCriterias, isLoading: criteriaLoading } =
    useFetchCriteriaForm({});

  const { loading } = useFetchInspectation(modalDetailId, {
    enabled: Boolean(modalDetailId && modalDetailId !== -1),
    onSuccess: (rs) => {
      setStats(rs.stats);
      form.setFieldsValue(rs.stats);
    },
  });

  const handleUpdateInspec = (id, stats) => {
    updateStatus({
      id,
      body: {
        stats,
      },
    });
  };

  const handleCreateInspec = (user_id, car_id, stats) => {
    createStatus({
      body: {
        user_id,
        car_id,
        stats,
      },
    });
  };

  return (
    <>
      <Col span={1} className="text-right pb-4">
        {
          <Button className="bg-primary" onClick={() => handleOpenDetail()}>
            <Typography className="text-white">{TEXT.button.addNew}</Typography>
          </Button>
        }
      </Col>
      <TableInQuery
        columns={columns({ handleOpenDetail })}
        dataSource={listInQuery}
        loading={isLoading || criteriaLoading}
      />

      <FormProvider>
        <ModalContainer
          title={!isNew ? "DANH SÁCH KIỂM TRA" : "TẠO DANH SÁCH KIỂM TRA"}
          open={!!modalDetailId}
          loading={loading || criteriaLoading}
          width={800}
          footer={footer}
          onCancel={onCancel}
        >
          {
            <ModalInquiryDetail
              id={modalDetailId}
              form={form}
              stats={stats}
              onSubmit={handleUpdateInspec}
              onCreate={handleCreateInspec}
              isNew={isNew}
              listCriterias={listCriterias}
            />
          }
        </ModalContainer>
      </FormProvider>
    </>
  );
}

export default HomePage;
