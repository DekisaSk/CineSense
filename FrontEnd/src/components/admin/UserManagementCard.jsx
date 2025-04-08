import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Delete, Block } from "@mui/icons-material";
import { getAllUsers } from "../../api/getAllUsers";
import { useEffect } from "react";
import { useState } from "react";
import useManageUsers from "../../hooks/useManageUsers";
const UserManagementCard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const { handleDisable, handleDelete } = useManageUsers(setUsers);

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          User Management
        </Typography>
        {Array.isArray(users) &&
          users.map((user) => (
            <Box
              key={user.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <Typography>{user.email}</Typography>
              <Box>
                <IconButton color="error" onClick={() => handleDelete(user.id)}>
                  <Delete />
                </IconButton>
                <IconButton
                  color={user.is_disabled ? "error" : "default"}
                  onClick={() => handleDisable(user.id)}
                >
                  <Block />
                </IconButton>
              </Box>
            </Box>
          ))}
      </CardContent>
    </Card>
  );
};

export default UserManagementCard;
