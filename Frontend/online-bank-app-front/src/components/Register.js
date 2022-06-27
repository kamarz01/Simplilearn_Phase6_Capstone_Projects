import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/slicers/User";

const Register = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  useEffect(() => {
    setError("");
    if (localStorage.getItem("userId")) {
      navigator("/home");
    }
  }, []);

  const handleUserData = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = (e) => {
    setError("");
    e.preventDefault();
    axios
      .post("http://localhost:9999/api/user/register", userData)
      .then((response) => {
        if (response.data.data) {
          navigator("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              sx={{
                mt: 5,
              }}
              alt="Kamar Banking Solutions"
              src="images/logo.png"
            />
          </Grid>
          <form onSubmit={handleRegister}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Please provide correct details.
              </Typography>
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography color="error" gutterBottom variant="body2">
                {error}
              </Typography>
            </Box>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              margin="normal"
              variant="outlined"
              value={userData.firstName}
              onChange={handleUserData}
            />
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              margin="normal"
              variant="outlined"
              value={userData.lastName}
              onChange={handleUserData}
            />
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              margin="normal"
              variant="outlined"
              value={userData.username}
              onChange={handleUserData}
            />
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              type="email"
              variant="outlined"
              value={userData.email}
              onChange={handleUserData}
            />
            <TextField
              required
              fullWidth
              label="Phone"
              name="phone"
              margin="normal"
              variant="outlined"
              value={userData.phone}
              onChange={handleUserData}
            />
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              margin="normal"
              type="password"
              variant="outlined"
              value={userData.password}
              onChange={handleUserData}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
          </form>
          <Typography color="textSecondary" variant="body2">
            Have an account? &nbsp;
            <Link to="/" style={{ textDecoration: "none" }}>
              Sign In!
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Register;
