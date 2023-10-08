import { Button as AppButton } from "antd";
import PropTypes from "prop-types";
import { memo } from "react";

function Button({ label, onClick, ...rest }) {
  return (
    <AppButton onClick={onClick} {...rest}>
      {label}
    </AppButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default memo(Button);
