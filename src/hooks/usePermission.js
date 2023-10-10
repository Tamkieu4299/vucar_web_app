import { getLocalStorage } from "../utils/storage";

const DELETE_PERMISSION = [0];
const EDIT_PERMISSION = [0, 1];
const VIEW_PERMISSION = [0, 1, 2];

function usePermission() {
  const user = getLocalStorage("tempUser");

  const userRole = user.authority_id;

  const editPermission = EDIT_PERMISSION.includes(userRole);
  const deletePermission = DELETE_PERMISSION.includes(userRole);
  const viewPermission = VIEW_PERMISSION.includes(userRole);

  return {
    editPermission,
    deletePermission,
    viewPermission,
  };
}

export default usePermission;
