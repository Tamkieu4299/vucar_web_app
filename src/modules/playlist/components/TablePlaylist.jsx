import { Table } from "antd";
import PropTypes from "prop-types";
import { LABEL } from "../../../localization/en";
import TableContainer from "../../../components/Table/TableContainer";

function TablePlaylist({ columns, loading = false, ...rest }) {
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

TablePlaylist.propTypes = {
  columns: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default TablePlaylist;
