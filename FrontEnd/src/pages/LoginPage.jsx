import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordModal from "../components/auth/ForgotPassword";
import useLogin from "../hooks/useLogin";
import useForgotPassword from "../hooks/useForgotPassword";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleLogin,
    modalOpen,
    handleForgotPassword,
    handleModalClose,
  } = useLogin();

  const { resetEmail, setResetEmail, notification, handleResetPassword } =
    useForgotPassword();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: { xs: 2, md: 4 },
        pb: { xs: 2, md: 4 },
        px: 2,
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ pb: 4, textAlign: "center", fontWeight: "bold" }}
          >
            Sign in to your account
          </Typography>

          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleLogin={handleLogin}
            handleForgotPassword={handleForgotPassword}
          />

          <ForgotPasswordModal
            modalOpen={modalOpen}
            handleModalClose={handleModalClose}
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            notification={notification}
            handleResetPassword={handleResetPassword}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
