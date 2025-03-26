import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ForgotPasswordModal = ({
  modalOpen,
  handleModalClose,
  resetEmail,
  setResetEmail,
}) => {
  const [notification, setNotification] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    setNotification(
      "A password reset link has been sent to your email address. (Simulated)"
    );
  };

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box
        className="p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded shadow-lg w-96 flex flex-col gap-4"
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Reset Password
        </Typography>

        {notification ? (
          <Typography variant="body2">{notification}</Typography>
        ) : (
          <Box
            component="form"
            onSubmit={onFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              fullWidth
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value);
                setNotification("");
              }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Reset Link
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
