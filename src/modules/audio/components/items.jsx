import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";

export const initAudioValues = {
  car_id: "",
  name: "",
  model: ""
};

export const columns = ({
  handleOpenDetail = noop,
  handleOpenDelete = noop,
}) => [
  {
    title: "ID",
    dataIndex: "car_id",
    key: "car_id",
    sorter: (a, b) => a.car_id - b.car_id,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
  },
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: 100,
    render: (_text, record) => (
      <GroupButtonAction
        onEdit={() => handleOpenDetail(record.car_id)}
        onDelete={() => handleOpenDelete(record.car_id)}
      />
    ),
  },
];
