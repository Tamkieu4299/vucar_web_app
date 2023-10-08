import { DeleteOutlined } from "@ant-design/icons";
import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";
import IconButton from "../../../components/Button/IconButton";

export const initialPlaylistValue = {
  playlist_name: "",
  playlist_description: "",
  audio_ids: [],
};

export const columns = ({
  handleOpenDetail = noop,
  handleOpenDelete = noop,
}) => [
  {
    title: "Name",
    dataIndex: "playlist_name",
    key: "playlist_name",
    sorter: (a, b) => a.playlist_name.length - b.playlist_name.length,
  },
  {
    title: "Number of song",
    dataIndex: "number_of_songs",
    key: "number_of_songs",
    sorter: (a, b) => parseInt(a.number_of_songs) - parseInt(b.number_of_songs),
  },
  {
    title: "Total duration",
    dataIndex: "total_time",
    key: "total_time",
    sorter: (a, b) => parseInt(a.total_time) - parseInt(b.total_time),
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
        onDelete={() => {
          handleOpenDelete(record.playlist_id);
        }}
        onEdit={() => {
          handleOpenDetail(record.playlist_id);
        }}
      />
    ),
  },
];

export const audiosColumn = ({ handleDelete = noop }) => [
  {
    title: "Name",
    dataIndex: "label",
    key: "label",
    width: "500px",
  },
  {
    title: "Durations",
    dataIndex: "des",
    key: "des",
  },
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    align: "center",
    width: 90,
    render: (_text, record) => (
      <IconButton
        onClick={() => handleDelete(record)}
        title="Delete"
        icon={<DeleteOutlined />}
        className="text-base text-red-500"
      />
    ),
  },
];
