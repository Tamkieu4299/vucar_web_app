import { EyeOutlined } from "@ant-design/icons";
import { noop } from "lodash";
import IconButton from "../../../components/Button/IconButton";
import { TEXT } from "../../../localization/en";
import CustomButtonStatus from "./CustomButtomStatus";
import SelectStatus from "./SelectStatus";

export const initCarValues = {
  status: "",
};

export const itemStatus = {
  false: {
    color: "rgb(155, 155, 155)",
    label: "False",
  },
  true: {
    color: "rgb(45, 153, 100)",
    label: "True",
  },
};

export const selectOptions = [
  {
    key: "true",
    label: (
      <CustomButtonStatus
        color={itemStatus.true.color}
        label={itemStatus.true.label}
      />
    ),
    text: itemStatus.true.label,
    color: itemStatus.true.color,
  },
  {
    key: "false",
    label: (
      <CustomButtonStatus
        color={itemStatus.false.color}
        label={itemStatus.false.label}
      />
    ),
    text: itemStatus.false.label,
    color: itemStatus.false.color,
  },
];

export const columns = ({
  handleUpdateStatus = noop,
  handleOpenDetail = noop,
}) => [
  {
    title: "ID",
    dataIndex: "inspectation_id",
    key: "inspectation_id",
    sorter: (a, b) => a.inspectation_id - b.inspectation_id,
  },
  {
    title: "User",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "Car",
    dataIndex: "car_id",
    key: "car_id",
  },
  {
    title: "Statistics",
    key: "action",
    fixed: "right",
    align: "center",
    width: 100,
    render: (_text, record) => (
      <IconButton
        onClick={() => handleOpenDetail(record.inspectation_id)}
        title="View Stats"
        icon={<EyeOutlined />}
        className="text-base text-sky-500"
      />
    ),
  },
];
