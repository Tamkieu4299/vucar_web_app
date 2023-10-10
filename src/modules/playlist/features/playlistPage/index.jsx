import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { TEXT } from "@/localization/en";
import { displaySuccessMessage } from "@/utils/request";
import { trimParams } from "@/utils/util";
import { Button, Col, Form, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import useModal from "../../../../hooks/useModal";
import useFetchAllCar from "../../../car/services/useFetchAllCar";
import SearchDriver from "../../../driver/features/components/Search";
import { TablePlaylist } from "../../components";
import ModalDetailPlaylist from "../../components/ModalDetail";
import { columns } from "../../components/items";
import useCreatePlaylist from "../../services/useCreatePlaylist";
import useDeletePlaylist from "../../services/useDeletePlaylist";
import useFetchAllPlaylist from "../../services/useFetchAllPlaylist";
import useFetchPlaylist from "../../services/useFetchPlaylist";
import useUpdatePlaylist from "../../services/useUpdatePlaylist";
import usePermission from "../../../../hooks/usePermission";
import { without } from "lodash";
import { getLocalStorage } from "../../../../utils/storage";

function PlaylistPage() {
  const [form] = useForm();
  const [modalDetailId, setModalDetailId] = useState(null);
  const { editPermission } = usePermission();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("name") || "";
  const [audioChecked, setAudioChecked] = useState([]);
  const user = getLocalStorage("tempUser");
  const handleChangeAudio = (v) => {
    setAudioChecked(v.reverse());
  };

  const handleDeleteItem = async (id) => {
    await setAudioChecked(without(audioChecked, id));
    form.setFieldValue(
      "audio_ids",
      without(audioChecked, id).map((i) => i.value)
    );
  };
  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  //Title modal
  const title = useMemo(() => {
    if (isNew) return `${TEXT.button.addNew} ${TEXT.playlist.playlist}`;
    if (isEdit) return `${TEXT.button.edit} ${TEXT.playlist.playlist}`;
    return "";
  }, [isEdit, isNew]);

  //handle Modal
  const handleOpenDetail = useCallback((id = -1) => setModalDetailId(id), []);

  //delete play list
  const { mutateAsync: deletePlaylist } = useDeletePlaylist({
    onSuccess: (rs) => {
      displaySuccessMessage(rs.message);
      onCloseModal();
      refetch();
    },
  });

  const { openModalDelete, onCloseModal } = useModal({
    onDeleteOk: deletePlaylist,
  });

  //fetch all data
  const {
    data: listPlaylist,
    isLoading: loadingListPlaylist,
    refetch,
  } = useFetchAllPlaylist(param, {});

  const audioName = Form.useWatch("search_audio", form);

  const { data: listAudio, refetch: fetchAudio } = useFetchAllCar(
    audioName,
    {}
  );

  //fetch single data
  const { isLoading: loadingPlaylist } = useFetchPlaylist(modalDetailId, {
    enabled: Boolean(modalDetailId && modalDetailId !== -1),
    onSuccess: (rs) => {
      setAudioChecked(
        rs.audios.map(({ audio_id, audio_name, durations }) => ({
          label: audio_name,
          value: audio_id,
          des: durations,
        }))
      );
      form.setFieldsValue({
        ...rs,
        audio_ids: rs.audios.map((i) => i.audio_id),
      });
    },
  });

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    form.resetFields();
    fetchAudio("");
    setAudioChecked([]);
  }, [fetchAudio, form]);

  //submit
  const { mutateAsync: createPlaylist, isLoading: isCreate } =
    useCreatePlaylist({
      onSuccess: () => {
        refetch();
        displaySuccessMessage("Create successfully");
        setModalDetailId(null);
        form.resetFields();
        setAudioChecked([]);
      },
    });

  const { mutate: updatePlaylist, isLoading: isUpdate } = useUpdatePlaylist({
    onSuccess: () => {
      displaySuccessMessage(TEXT.message.update_success);
      onCancel();
      refetch();
    },
  });

  const onSubmit = () => {
    const value = form.getFieldValue();
    if (isNew) createPlaylist(trimParams({ ...value, created_by: user?.name }));
    if (isEdit)
      updatePlaylist({
        id: modalDetailId,
        body: {
          ...value,
          created_by: user?.name,
          audio_ids: audioChecked.map((i) => i.value),
        },
      });
  };

  //Loading
  const loading = useMemo(() => {
    return loadingPlaylist || loadingListPlaylist || isUpdate;
  }, [loadingListPlaylist, loadingPlaylist, isUpdate]);

  const onSearch = () => {
    refetch();
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <SearchDriver onSearch={onSearch} />
        </Col>
        <Col span={12} className="text-right">
          {editPermission && (
            <Button className="bg-primary " onClick={() => handleOpenDetail()}>
              <Typography className="text-white">
                {TEXT.button.addNew}
              </Typography>
            </Button>
          )}
        </Col>
      </Row>

      <TablePlaylist
        isLoading={loading}
        columns={columns({
          handleOpenDetail,
          handleOpenDelete: openModalDelete,
        })}
        dataSource={listPlaylist}
        rowKey="playlist_id"
        // rowSelection={rowSelection}
      />
      <Form.Provider>
        <ModalContainer
          title={title}
          open={!!modalDetailId}
          onOk={() => form.submit()}
          confirmLoading={isCreate}
          okText={TEXT.button.ok}
          okButtonProps={{ disabled: !editPermission, className: "bg-primary" }}
          onCancel={onCancel}
          cancelText={TEXT.button.cancel}
          width={800}
        >
          <ModalDetailPlaylist
            form={form}
            onSubmit={onSubmit}
            options={listAudio}
            handleChangeAudio={handleChangeAudio}
            handleDeleteItem={handleDeleteItem}
            audioChecked={audioChecked}
          />
        </ModalContainer>
      </Form.Provider>
    </>
  );
}

export default PlaylistPage;
