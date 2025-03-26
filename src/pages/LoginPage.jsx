import axios from "axios";
import { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";
import ForgotPassword from "../components/auth/ForgotPassword";

const LoginPage = () => {
  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // forgot pass state
  const [modalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // login handler
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("...", { email, password });
      localStorage.setItem("token", data.token); // JWT
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Error logging in:", error);
      }
    }
  };

  // forgot pass handler
  const handleForgotPassword = () => setModalOpen(true);

  // close forgot tab handler
  const handleModalClose = () => setModalOpen(false);

  // handle reset password
  const handleResetPassword = async () => {
    try {
      const { data } = await axios.post("...", { email: resetEmail });
      alert(data.message);
      setModalOpen(false);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Error sending reset link:", error);
      }
    }
  };

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

          <ForgotPassword
            modalOpen={modalOpen}
            handleModalClose={handleModalClose}
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            handleResetPassword={handleResetPassword}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
