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

const Login = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const dispatcher = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";
    if (localStorage.getItem("userId")) {
      navigator("/home");
    }
  }, []);

  const handleUserData = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = (e) => {
    setError("");
    e.preventDefault();
    axios
      .post("http://localhost:9999/api/user/login", userData)
      .then((response) => {
        if (response.data.data) {
          if (response.data.data.enabled) {
            dispatcher(setUser(response.data.data));
            localStorage.setItem("userId", response.data.data.userId);
            navigator("/home");
          }else{
            setError("Your account is not yet enabled or is locked.");
          }
        }
      })
      .catch((error) => {
        setError("Wrong username or password.");
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
                mt: 18,
              }}
              alt="Kamar Banking Solutions"
              src="images/logo.png"
            />
          </Grid>
          <form onSubmit={handleLogin}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in to manage your bank account.
              </Typography>
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography color="error" name="error" gutterBottom variant="body2">
                {error}
              </Typography>
            </Box>
            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="outlined"
              name="username"
              value={userData.username}
              onChange={handleUserData}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={userData.password}
              onChange={handleUserData}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                name="loginButton"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
          </form>
          <Typography color="textSecondary" variant="body2">
            Don&apos;t have a bank account? &nbsp;
            <Link to="/register" style={{ textDecoration: "none" }}>
              Create one!
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};
export default Login;
