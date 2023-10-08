import { Tooltip } from "antd";
import PropTypes from "prop-types";

function IconButton({ title, icon, ...props }) {
  return (
    <Tooltip title={title}>
      <span>
        <a {...props}>{icon}</a>
      </span>
    </Tooltip>
  );
}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconButton;
