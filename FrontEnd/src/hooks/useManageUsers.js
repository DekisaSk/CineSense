import { deleteUser } from "../api/deleteUser";
import { disableUser } from "../api/disableUser";

export default function useManageUsers(setUsers) {
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleDisable = async (id) => {
    try {
      await disableUser(id);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, is_disabled: !user.is_disabled } : user
        )
      );
    } catch (err) {
      console.error("Error disabling user:", err);
    }
  };

  return { handleDelete, handleDisable };
}
