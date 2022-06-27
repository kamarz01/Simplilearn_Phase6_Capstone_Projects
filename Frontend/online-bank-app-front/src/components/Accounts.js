import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
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
import SavingsIcon from "@mui/icons-material/Savings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/slicers/User";

const Accounts = () => {
  const userData = useSelector((state) => state.user.user);
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(null);
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleUserDataNotFound = () => {
    localStorage.clear();
    navigator("/");
  };
  const showPopup = (usId, accId, operation) => {
    setRequest({ userId: usId, accountId: accId, op: operation,amount:0 });
    setOpen(true);
  };
  const updateState = () => {
    if(request.amount === 0 || request.amount < 0){
      setNotification({ open: true, msg: "Please enter valid amount.", type: "error" });
      return;
    }
    if(request.op === "withdraw"){
      const balance = userData.userAccounts.filter((acc) => acc.accountId === request.accountId)[0].accountBalance
      if(balance < request.amount){
        setNotification({ open: true, msg: "Your balance does not allow this withdraw.", type: "error" });
        return;
      }
    }
    const data = {
      userId: request.userId,
      depositWithdrawAmount:request.amount,
      accountId:request.accountId,
      operationType:request.op
    };
    axios
      .post("http://localhost:9999/api/user/withdrawOrDeposit", data)
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
    setOpen(false);
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
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Deposit / Withdeaw money."}
              </DialogTitle>
              <DialogContent>
                <TextField
                  required
                  color="secondary"
                  fullWidth
                  type="number"
                  label="Amount"
                  name="amount"
                  defaultValue="0"
                  onChange={(e) => setRequest((prev) => ({...prev,amount:e.target.value }))}
                  sx={{ my: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={updateState}>Submit</Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <Card>
                  <CardHeader
                    title="Primary Account"
                    action={<AttachMoneyIcon />}
                  />
                  <Divider />
                  <CardContent>
                    <TextField
                      focused
                      color="secondary"
                      fullWidth
                      id="outlined-read-only-input"
                      label="Account Number"
                      value={
                        userData.userAccounts.filter(
                          (acc) => acc.accountName === "Primary"
                        )[0].accountId
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ my: 2 }}
                    />
                    <TextField
                      focused
                      color="secondary"
                      fullWidth
                      id="outlined-read-only-input"
                      label="Account Balance"
                      value={
                        userData.userAccounts.filter(
                          (acc) => acc.accountName === "Primary"
                        )[0].accountBalance
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ my: 2 }}
                    />
                    <Divider />
                    <Box sx={{ p: 2 }}>
                      <Grid
                        container
                        spacing={2}
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Grid
                          item
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Button
                            component="a"
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              showPopup(
                                userData.userId,
                                userData.userAccounts.filter(
                                  (acc) => acc.accountName === "Primary"
                                )[0].accountId,
                                "deposit"
                              )
                            }
                          >
                            Deposit
                          </Button>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Button
                            component="a"
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="warning"
                            onClick={() =>
                              showPopup(
                                userData.userId,
                                userData.userAccounts.filter(
                                  (acc) => acc.accountName === "Primary"
                                )[0].accountId,
                                "withdraw"
                              )
                            }
                          >
                            Withdraw
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={6} md={6} xl={6} xs={12}>
                <Card>
                  <CardHeader title="Saving Account" action={<SavingsIcon />} />
                  <Divider />
                  <CardContent>
                    <TextField
                      focused
                      color="secondary"
                      fullWidth
                      id="outlined-read-only-input"
                      label="Account Number"
                      value={
                        userData.userAccounts.filter(
                          (acc) => acc.accountName === "Saving"
                        )[0].accountId
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ my: 2 }}
                    />
                    <TextField
                      focused
                      color="secondary"
                      fullWidth
                      id="outlined-read-only-input"
                      label="Account Balance"
                      value={
                        userData.userAccounts.filter(
                          (acc) => acc.accountName === "Saving"
                        )[0].accountBalance
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ my: 2 }}
                    />
                    <Divider />
                    <Box sx={{ p: 2 }}>
                      <Grid
                        container
                        spacing={2}
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Grid
                          item
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Button
                            component="a"
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              showPopup(
                                userData.userId,
                                userData.userAccounts.filter(
                                  (acc) => acc.accountName === "Saving"
                                )[0].accountId,
                                "deposit"
                              )
                            }
                          >
                            Deposit
                          </Button>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Button
                            component="a"
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="warning"
                            onClick={() =>
                              showPopup(
                                userData.userId,
                                userData.userAccounts.filter(
                                  (acc) => acc.accountName === "Saving"
                                )[0].accountId,
                                "withdraw"
                              )
                            }
                          >
                            Withdraw
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    title="Accounts Transactions"
                    action={<ReceiptLongIcon />}
                  />
                  <Divider />
                  <CardContent>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction Id</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Account</TableCell>
                          <TableCell>Operation</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userData.transactions &&
                          userData.transactions.length > 0 &&
                          userData.transactions.map((transaction, index) => (
                            <TableRow key={index}>
                              <TableCell>{transaction.transactionId}</TableCell>
                              <TableCell>
                                {transaction.transactionDate}
                              </TableCell>
                              <TableCell>
                                {transaction.accountId} (
                                {transaction.accountType})
                              </TableCell>
                              <TableCell>{transaction.operationType}</TableCell>
                              <TableCell>{transaction.operationType === "withdraw" || transaction.operationType === "deposit" ? transaction.depositWithdrawAmount : transaction.amount}</TableCell>
                              <TableCell>{transaction.operationType === "withdraw" || transaction.operationType === "deposit" ? transaction.depositWithdrawStatus : "-"}</TableCell>
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

export default Accounts;
