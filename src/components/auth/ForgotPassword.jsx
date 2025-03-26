import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ForgotPasswordModal = ({
  modalOpen,
  handleModalClose,
  resetEmail,
  setResetEmail,
  handleResetPassword,
}) => {
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
        <Typography variant="h6">Reset Password</Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          fullWidth
          className="mt-4"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="pt-4"
          fullWidth
          onClick={handleResetPassword}
        >
          Send Reset Link
        </Button>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
