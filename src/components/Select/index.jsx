import { Select } from "antd";
import { noop } from "lodash";
import PropTypes from "prop-types";

function CustomSelect({
  options,
  placeholder = "",
  defaultValue = "",
  optionFilterProp = "children",
  onChange = noop,
  onSearch = noop,
  showSearch = true,
  value,
  ...rest
}) {
  return (
    <Select
      {...rest}
      value={value}
      showSearch={showSearch}
      placeholder={placeholder}
      optionFilterProp={optionFilterProp}
      defaultValue={defaultValue}
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  );
}
CustomSelect.propTypes = {
  showSearch: PropTypes.bool,
  options: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.object,
  optionFilterProp: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  value: PropTypes.array,
};
export default CustomSelect;
