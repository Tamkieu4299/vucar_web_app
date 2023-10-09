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
    title: "ID",
    dataIndex: "user_id",
    key: "user_id",
    sorter: (a, b) => a.user_id - b.user_id,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Authority",
    dataIndex: "authority_id",
    key: "authority_id",
  },
  // {
  //   title: "Actions",
  //   key: "action",
  //   fixed: "right",
  //   width: 100,
  //   render: (_text, record) => (
  //     <GroupButtonAction
  //       onDelete={() => {
  //         handleOpenDelete(record.user_id);
  //       }}
  //       onEdit={() => {
  //         handleOpenDetail(record.user_id);
  //       }}
  //     />
  //   ),
  // },
];
