import { EyeOutlined } from "@ant-design/icons";
import { noop } from "lodash";
import IconButton from "../../../components/Button/IconButton";
import { TEXT } from "../../../localization/en";
import CustomButtonStatus from "./CustomButtomStatus";
import SelectStatus from "./SelectStatus";

export const initAudioValues = {
  status: "",
};

export const itemStatus = {
  todo: {
    color: "rgb(155, 155, 155)",
    label: TEXT.status.todo,
  },
  inprogress: {
    color: "rgb(46, 124, 209)",
    label: TEXT.status.inprogress,
  },
  done: {
    color: "rgb(45, 153, 100)",
    label: TEXT.status.done,
  },
};

export const selectOptions = [
  {
    key: "0",
    label: (
      <CustomButtonStatus
        color={itemStatus.todo.color}
        label={itemStatus.todo.label}
      />
    ),
    text: itemStatus.todo.label,
    color: itemStatus.todo.color,
  },
  {
    key: "1",
    label: (
      <CustomButtonStatus
        color={itemStatus.done.color}
        label={itemStatus.done.label}
      />
    ),
    text: itemStatus.done.label,
    color: itemStatus.done.color,
  },
];

export const columns = ({
  handleUpdateStatus = noop,
  handleOpenDetail = noop,
}) => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Create by",
    dataIndex: "created_by",
    key: "created_by",
  },
  {
    title: "Updated at",
    dataIndex: "updated_at",
    key: "updated_at",
    sorter: (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    align: "center",
    filters: [
      {
        text: "Todo",
        value: "0",
      },
      {
        text: "Done",
        value: "1",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (_text, record) => (
      <SelectStatus
        status={record.status}
        id={record.inquiry_id}
        handleClick={handleUpdateStatus}
      />
    ),
  },
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    align: "center",
    width: 100,
    render: (_text, record) => (
      <IconButton
        onClick={() => handleOpenDetail(record.inquiry_id)}
        title="Edit"
        icon={<EyeOutlined />}
        className="text-base text-sky-500"
      />
    ),
  },
];
