import { getLocalStorage } from "../utils/storage";

const DELETE_PERMISSION = ["admin"];
const EDIT_PERMISSION = ["admin", "operator"];
const VIEW_PERMISSION = ["admin", "operator", "viewer"];

function usePermission() {
  const user = getLocalStorage("tempUser");

  const userRole = user.role;

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
