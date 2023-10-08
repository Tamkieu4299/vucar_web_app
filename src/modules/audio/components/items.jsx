import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";

export const initAudioValues = {
  audio_name: "",
  durations: "",
  link: "",
  type: "",
  image_id: "",
  file: null,
};

export const columns = ({
  handleOpenDetail = noop,
  handleOpenDelete = noop,
}) => [
  {
    title: "Name",
    dataIndex: "audio_name",
    key: "audio_name",
    sorter: (a, b) => a.audio_name.length - b.audio_name.length,
  },
  {
    title: "Durations",
    dataIndex: "durations",
    key: "durations",
    sorter: (a, b) => parseInt(a.durations) - parseInt(b.durations),
  },

  {
    title: "Updated at",
    dataIndex: "updated_at",
    key: "updated_at",

    sorter: (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
  },
  {
    title: "Created by",
    dataIndex: "created_by",
    key: "created_by",
    filters: [
      {
        text: "admin",
        value: "admin",
      },
      {
        text: "operator",
        value: "operator",
      },
    ],
    onFilter: (value, record) => record.created_by.indexOf(value) === 0,
  },

  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: 100,
    render: (_text, record) => (
      <GroupButtonAction
        onEdit={() => handleOpenDetail(record.audio_id)}
        onDelete={() => handleOpenDelete(record.audio_id)}
      />
    ),
  },
];
