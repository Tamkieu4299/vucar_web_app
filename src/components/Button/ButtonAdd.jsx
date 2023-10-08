import { Button } from "antd";
import PropTypes from "prop-types";
import { LABEL } from "../../localization/en";

function ButtonAddNew({ onClick }) {
  return (
    <Button className="bg-main text-white" onClick={onClick}>
      {LABEL.button.addNew}
    </Button>
  );
}
ButtonAddNew.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default ButtonAddNew;
