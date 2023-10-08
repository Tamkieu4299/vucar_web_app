import { Row } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import IconButton from "./IconButton";
import PropTypes from "prop-types";
import usePermission from "../../hooks/usePermission";

function GroupButtonAction({ onEdit, onDelete }) {
  const { deletePermission } = usePermission();

  return (
    <Row className="justify-center gap-2">
      <IconButton
        onClick={onEdit}
        title="Edit"
        icon={<EditOutlined />}
        className="text-base text-sky-500"
      />
      {deletePermission && (
        <IconButton
          onClick={onDelete}
          title="Delete"
          icon={<DeleteOutlined />}
          className="text-base text-red-500"
        />
      )}
    </Row>
  );
}

GroupButtonAction.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default GroupButtonAction;
