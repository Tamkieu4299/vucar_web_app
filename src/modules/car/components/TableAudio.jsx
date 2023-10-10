import { Table } from "antd";
import PropTypes from "prop-types";
import { LABEL } from "../../../localization/en";
import TableContainer from "../../../components/Table/TableContainer";
import "./styles.scss";

function TableAudio({
  columns,
  loading = false,
  scroll = 800,
  pageSize = 10,
  ...rest
}) {
  return (
    <TableContainer>
      <Table
        rowKey="id"
        className="custom-table"
        locale={{ emptyText: LABEL.emptyData }}
        columns={columns}
        loading={loading}
        pagination={{
          defaultPageSize: pageSize,
        }}
        scroll={{ x: scroll }}
        {...rest}
      />
    </TableContainer>
  );
}

TableAudio.propTypes = {
  columns: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  scroll: PropTypes.number,
  pageSize: PropTypes.number,
};
export default TableAudio;
