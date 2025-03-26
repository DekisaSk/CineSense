import { useState } from "react";
import axios from "axios";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post("...", {
        firstName,
        lastName,
        email,
        password,
      });

      alert(response.data.message || "Registration successful!");

      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Paper elevation={4} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="pb-4 text-center font-bold">
          Create Your Account
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <TextField
            label="First Name"
            variant="outlined"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>

          <Typography variant="body2" className="mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default RegisterPage;
