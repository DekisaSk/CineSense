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
  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6" className="mb-4">
          Add New Admin
        </Typography>
        <Box className="flex flex-col gap-2 md:flex-row">
          <TextField label="Email" variant="outlined" type="email" fullWidth />
          <Button
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
