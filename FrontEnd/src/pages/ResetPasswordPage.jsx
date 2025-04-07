import { useSearchParams } from "react-router-dom"; // ili `next/router` ako koristiš Next.js
import useResetPassword from "../hooks/useResetPassword";
import { TextField, Button, Typography, Box } from "@mui/material";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { newPassword, setNewPassword, notification, success, handleSubmit } =
    useResetPassword(token);

  return (
    <Box className="flex flex-col items-center p-8 max-w-md mx-auto">
      <Typography variant="h5" className="mb-4">
        Set New Password
      </Typography>

      {notification && (
        <Typography color={success ? "green" : "error"} className="mb-2">
          {notification}
        </Typography>
      )}

      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        required
        className="mb-4"
      />

      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordPage;
