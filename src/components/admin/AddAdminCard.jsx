import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";

const AddAdminCard = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Adding Admin with email:", email);

    setEmail("");
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="mb-4 pb-2">
          Add New Admin
        </Typography>

        <Box
          component="form"
          className="flex flex-col gap-2 md:flex-row"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<AdminPanelSettings />}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddAdminCard;
