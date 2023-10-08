import { Button } from "antd";
import PropTypes from "prop-types";

function CustomButtonStatus({ color, label, onChange, ...rest }) {
  return (
    <Button
      {...rest}
      onClick={onChange}
      className="text-center text-white relative hover:!text-white"
      style={{
        backgroundColor: color,
      }}
    >
      {label}
    </Button>
  );
}
CustomButtonStatus.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
export default CustomButtonStatus;
