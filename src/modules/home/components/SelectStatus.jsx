import { Dropdown } from "antd";
import PropTypes from "prop-types";
import { selectOptions } from "./items";
import CustomButtonStatus from "./CustomButtomStatus";
import { filter, noop } from "lodash";
import usePermission from "../../../hooks/usePermission";

function SelectStatus({ status, id, handleClick = noop, disabled = false }) {
  const filterOption = filter(selectOptions, (i) => i.key !== status);
  const { editPermission } = usePermission();

  return (
    <Dropdown
      menu={{
        items: filterOption,
        onClick: (e) => {
          handleClick(id, e?.key);
        },
      }}
      disabled={!editPermission}
      placement="bottom"
    >
      <CustomButtonStatus
        color={selectOptions.find(s => s.key === status)?.color}
        label={selectOptions.find(s => s.key === status)?.text}
      />
    </Dropdown>
  );
}

SelectStatus.propTypes = {
  status: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};
export default SelectStatus;
