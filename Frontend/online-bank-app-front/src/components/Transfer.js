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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slicers/User";
import axios from "axios";

const Transfer = () => {
  const userData = useSelector((state) => state.user.user);
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  const [requestData, setRequestData] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    msg: "",
    type: "",
  });
  useEffect(() => {
    if (!localStorage.getItem("userId")) navigator("/");
  }, []);
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ open: false, msg: "", type: "" });
  };
  const handleUserData = (e) => {
    setRequestData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTransfer = (e) => {
    e.preventDefault();
    if (!requestData.fromAccountId || requestData.fromAccountId === 0) {
      alert("Please select account.");
      return;
    }
    if (!requestData.toAccountId || requestData.toAccountId.length === 0) {
      alert("Please enter the recipient account.");
      return;
    }
    if (!requestData.amount || requestData.amount.length === 0) {
      alert("Please enter the amount.");
      return;
    }
    const data = {
      ...requestData,
      userId: userData.userId,
    };
    axios
      .post("http://localhost:9999/api/user/transferMoney", data)
      .then((response) => {
        if (response.data.data) {
          dispatcher(setUser(response.data.data));
          setNotification({
            open: true,
            msg: "Transfer completed successfully",
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
  const handleUserDataNotFound = () => {
    localStorage.clear();
    navigator("/");
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
              <Grid item xs={4}>
                <Card>
                  <CardHeader
                    title="Transfer Money"
                    action={<AttachMoneyIcon />}
                  />
                  <Divider />
                  <CardContent>
                    <form onSubmit={handleTransfer}>
                      <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel id="select-label">From</InputLabel>
                        <Select
                          required
                          color="secondary"
                          labelId="select-label"
                          label="From"
                          name="fromAccountId"
                          defaultValue="0"
                          onChange={handleUserData}
                        >
                          <MenuItem disabled value="0">
                            Choose account
                          </MenuItem>
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
                        label="Transfer To"
                        type="number"
                        name="toAccountId"
                        defaultValue="0"
                        onChange={handleUserData}
                        sx={{ my: 2 }}
                      />
                      <TextField
                        required
                        color="secondary"
                        fullWidth
                        type="number"
                        id="outlined-read-only-input"
                        label="Amount"
                        name="amount"
                        defaultValue="0"
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
                          Transfer
                        </Button>
                      </Box>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card>
                  <CardHeader title="Transfer History" />
                  <Divider />
                  <CardContent>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction Id</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>From Account</TableCell>
                          <TableCell>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userData.transactions &&
                          userData.transactions.length > 0 &&
                          userData.transactions.filter(trs => trs.operationType === "Transfer").map((transaction, index) => (
                            <TableRow key={index}>
                              <TableCell>{transaction.transactionId}</TableCell>
                              <TableCell>{transaction.transactionDate}</TableCell>
                              <TableCell>{transaction.accountId} ({transaction.accountType})</TableCell>
                              <TableCell>{transaction.details}</TableCell>
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

export default Transfer;
