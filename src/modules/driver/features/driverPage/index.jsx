import TableDriver from "../../components/TableDriver";
import useFetchAllDriver from "../../services/useFetchAllDriver";
import { columns } from "../../components/items";
import { useForm } from "antd/es/form/Form";
import { useCallback, useState } from "react";
import { TEXT } from "../../../../localization/en";
import useFetchDriver from "../../services/useFetchDriver";
import { displaySuccessMessage } from "../../../../utils/request";
import useModal from "../../../../hooks/useModal";
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
          handleOpenDetail
        })}
        rowKey="user_id"
      />
    </>
  );
}

export default DriverPage;
