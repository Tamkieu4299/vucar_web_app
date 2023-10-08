import { Table } from "antd";
import TableContainer from "../../../components/Table/TableContainer";
import { LABEL } from "../../../localization/en";
import PropTypes from "prop-types";

function TableDriver({ columns, loading = false, ...rest }) {
  return (
    <TableContainer>
      <Table
        rowKey="id"
        className="custom-table"
        locale={{ emptyText: LABEL.emptyData }}
        columns={columns}
        loading={loading}
        pagination={false}
        scroll={{ x: 800 }}
        {...rest}
      />
    </TableContainer>
  );
}

TableDriver.propTypes = {
  columns: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default TableDriver;
