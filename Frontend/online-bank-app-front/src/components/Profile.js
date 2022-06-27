import { Alert, Button, Card, CardContent, CardHeader, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { setUser } from "../redux/slicers/User";

const Profile = () => {
  const userData = useSelector((state) => state.user.user);
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  const [updatedData, setUpdatedData] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    msg: "",
    type: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigator("/");
    }
    setUpdatedData({ ...userData, userAccounts: null });
  }, []);
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ open: false, msg: "", type: "" });
  };
  const handleUserDataNotFound = () => {
    localStorage.clear();
    navigator("/");
  };
  const handleUserData = (e) => {
    setUpdatedData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleProfileUpdate = (e) => {
    setError("");
    e.preventDefault();
    axios
      .patch("http://localhost:9999/api/user/profile", updatedData)
      .then((response) => {
        if (response.data.data) {
          dispatcher(setUser(response.data.data));
          setNotification({
            open: true,
            msg: "Profile data updated successfully",
            type: "success",
          });
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
        setNotification({
          open: true,
          msg: "Something went wrong.",
          type: "error",
        });
      });
  };
  return (
    <>
      {!userData && handleUserDataNotFound()}
      {userData && (
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Snackbar
            open={notification.open}
            autoHideDuration={3000}
            onClose={handleAlertClose}
          >
            <Alert
              onClose={handleAlertClose}
              severity={notification.type.toString()}
              sx={{ width: "100%" }}
            >
              {notification.msg}
            </Alert>
          </Snackbar>
          <Container>
            <Box sx={{ my: 3 }}>
              <Typography color="error" gutterBottom variant="body2">
                {error}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item  xs={12}>
                <Card>
                  <CardHeader
                    title="Update profile information"
                    action={<AccountBoxIcon />}
                  />
                  <Divider />
                  <CardContent>
                    <form onSubmit={handleProfileUpdate}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        margin="normal"
                        variant="outlined"
                        defaultValue={userData.firstName}
                        value={updatedData.firstName}
                        name="firstName"
                        InputLabelProps={{
                          shrink: userData.firstName ? true : false,
                        }}
                        onChange={handleUserData}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        variant="outlined"
                        defaultValue={userData.lastName}
                        value={updatedData.lastName}
                        name="lastName"
                        InputLabelProps={{
                          shrink: userData.lastName ? true : false,
                        }}
                        onChange={handleUserData}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        defaultValue={userData.username}
                        name="username"
                        InputLabelProps={{
                          shrink: userData.username ? true : false,
                        }}
                        onChange={handleUserData}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        margin="normal"
                        type="email"
                        variant="outlined"
                        defaultValue={userData.email}
                        value={updatedData.email}
                        name="email"
                        InputLabelProps={{
                          shrink: userData.email ? true : false,
                        }}
                        onChange={handleUserData}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Phone"
                        margin="normal"
                        variant="outlined"
                        defaultValue={userData.phone}
                        value={updatedData.phone}
                        name="phone"
                        InputLabelProps={{
                          shrink: userData.phone ? true : false,
                        }}
                        onChange={handleUserData}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        variant="outlined"
                        value={updatedData.password}
                        name="password"
                        onChange={handleUserData}
                      />
                      <Box sx={{ py: 2 }}>
                        <Button
                          color="success"
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Update Information
                        </Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Profile;
