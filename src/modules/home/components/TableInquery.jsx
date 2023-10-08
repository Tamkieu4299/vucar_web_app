import PropTypes from "prop-types";
import TableContainer from "../../../components/Table/TableContainer";
import { Table } from "antd";
import { LABEL } from "../../../localization/en";
import "./styles.scss";
function TableInQuery({ columns, loading = false, ...rest }) {
  return (
    <TableContainer>
      <Table
        rowKey="id"
        className="custom-table"
        locale={{ emptyText: LABEL.emptyData }}
        columns={columns}
        pagination={false}
        loading={loading}
        scroll={{ x: 800 }}
        {...rest}
      />
    </TableContainer>
  );
}
TableInQuery.propTypes = {
  columns: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default TableInQuery;
