import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";
import { Typography } from "antd";

export const initialDriverValues = {
  playlist_id: "",
};

export const columns = ({
  handleOpenDetail = noop,
  handleOpenDelete = noop,
}) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Car seat",
    dataIndex: "car_seat",
    key: "car_seat",
    sorter: (a, b) => parseInt(a.car_seat) - parseInt(b.car_seat),
  },

  {
    title: "City",
    dataIndex: "citizen_id",
    key: "citizen_id",
  },
  {
    title: "License",
    dataIndex: "driving_license",
    key: "driving_license",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Playlist",
    dataIndex: "playlist_id",
    key: "playlist_id",
    render: (_text, record) => (
      <Typography>{record.playlist_id?.playlist_name ?? ""}</Typography>
    ),
  },

  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: 100,
    render: (_text, record) => (
      <GroupButtonAction
        onDelete={() => {
          handleOpenDelete(record.user_id);
        }}
        onEdit={() => {
          handleOpenDetail(record.user_id);
        }}
      />
    ),
  },
];
