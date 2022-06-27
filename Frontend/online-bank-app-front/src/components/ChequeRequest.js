import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/slicers/User";

const ChequeRequest = () => {
  const userData = useSelector((state) => state.user.user);
  const [requestData, setRequestData] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    msg: "",
    type: "",
  });
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigator("/");
    }
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
    setRequestData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChequeRequest = (e) => {
    e.preventDefault();
    if(!requestData.accountId || requestData.accountId === 0){
      alert("Please select account.")
      return;
    }
    const data = {
      ...requestData,
      userId: userData.userId,
      accountType: userData.userAccounts.filter(
        (acc) => acc.accountId === requestData.accountId
      )[0].accountName,
    };
    axios
      .post("http://localhost:9999/api/user/chequeRequest", data)
      .then((response) => {
        if (response.data.data) {
          dispatcher(setUser(response.data.data));
          setNotification({
            open: true,
            msg: "Request submitted successfully",
            type: "success",
          });
        }
      })
      .catch((error) => {
        setNotification({
          open: true,
          msg: error.response.data.error,
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
            flexGrow: 1,
            py: 4,
          }}
        >
          <Container maxWidth={false}>
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
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card>
                  <CardHeader
                    title="Transfer Money"
                    action={<MenuBookIcon />}
                  />
                  <Divider />
                  <CardContent>
                    <form onSubmit={handleChequeRequest}>
                      <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel id="select-label">Account</InputLabel>
                        <Select
                          required
                          color="secondary"
                          labelId="select-label"
                          label="From"
                          name="accountId"
                          defaultValue="0"
                          onChange={handleUserData}
                        >
                          <MenuItem disabled value="0">Choose account</MenuItem>
                          {userData.userAccounts.map((account, index) => (
                            <MenuItem key={index} value={account.accountId}>
                              {account.accountName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        required
                        color="secondary"
                        fullWidth
                        id="outlined-read-only-input"
                        label="Notes"
                        defaultValue=""
                        name="notes"
                        onChange={handleUserData}
                        sx={{ my: 2 }}
                      />
                      <Divider />
                      <Box>
                        <Button
                          sx={{ mt: 2 }}
                          variant="contained"
                          color="success"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardHeader title="Cheque Requests Status" />
                  <Divider />
                  <CardContent>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Request Id</TableCell>
                          <TableCell>Account</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userData.chequeRequests &&
                          userData.chequeRequests.length > 0 &&
                          userData.chequeRequests.map((cheque, index) => (
                            <TableRow key={index}>
                              <TableCell>{cheque.requestId}</TableCell>
                              <TableCell>{cheque.accountId} ({cheque.accountType})</TableCell>
                              <TableCell>{cheque.status}</TableCell>
                              <TableCell>{cheque.details ? cheque.details : "-"}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
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

export default ChequeRequest;
