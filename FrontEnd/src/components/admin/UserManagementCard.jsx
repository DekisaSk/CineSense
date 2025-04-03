import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Delete, Block } from "@mui/icons-material";

// dummy
const users = [
  { id: 1, email: "pavle@outlook.com", blocked: false },
  { id: 2, email: "dejan@gmail.com", blocked: true },
  { id: 3, email: "nikola@gmail.com", blocked: true },
  { id: 4, email: "andrija@gmail.com", blocked: true },
];

const UserManagementCard = () => {
  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          User Management
        </Typography>
        {users.map((user) => (
          <Box
            key={user.id}
            className="flex justify-between items-center py-2 border-b"
          >
            <Typography>{user.email}</Typography>
            <Box>
              <IconButton color="error">
                <Delete />
              </IconButton>
              <IconButton color={user.blocked ? "error" : "default"}>
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
