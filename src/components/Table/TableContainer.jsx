import PropTypes from "prop-types";
import "./styles.scss";
function TableContainer({ children }) {
  return <div className="table-container">{children}</div>;
}
TableContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TableContainer;
