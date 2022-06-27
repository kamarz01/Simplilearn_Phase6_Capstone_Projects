import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManageChequeRequests = () => {
  const userData = useSelector((state) => state.user.user);
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(null);
  const navigator = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigator("/");
    }
    axios
      .get("http://localhost:9999/api/admin/getAllChequeRequests")
      .then((response) => {
        if (response.data.code && response.data.code === 200) {
          setRequests(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);
  const handleUserDataNotFound = () => {
    localStorage.clear();
    navigator("/");
  };
  const showPopup = (reqId) => {
    setRequest(reqId);
    setStatus("Approved");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const updateState = () => {
    axios
      .post(
        `http://localhost:9999/api/admin/changeChequeRequestState/${request}/${status}`
      )
      .then((response) => {
        if (response.data.data) {
          setRequests(response.data.data);
        }
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
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Update cheque request details."}
              </DialogTitle>
              <DialogContent>
              <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel id="select-label">Status</InputLabel>
                        <Select
                          required
                          color="secondary"
                          labelId="select-label"
                          label="Status"
                          name="status"
                          defaultValue="Approved"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Declined">Declined</MenuItem>
                        </Select>
                      </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={updateState}>Update</Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Manage Cheque Requests" />
                  <Divider />
                  <CardContent>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Request Id</TableCell>
                          <TableCell>User Id</TableCell>
                          <TableCell>Account Id</TableCell>
                          <TableCell>Account Type</TableCell>
                          <TableCell>Notes From User</TableCell>
                          <TableCell>Admin Response</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {requests &&
                          requests.length > 0 &&
                          requests.map((req, index) => (
                            <TableRow key={index}>
                              <TableCell>{req.requestId}</TableCell>
                              <TableCell>{req.userId}</TableCell>
                              <TableCell>{req.accountId}</TableCell>
                              <TableCell>{req.accountType}</TableCell>
                              <TableCell>{req.notes}</TableCell>
                              <TableCell>{req.details}</TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => showPopup(req.requestId)}
                                  variant="contained"
                                  color="success"
                                >
                                  Update
                                </Button>
                              </TableCell>
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

export default ManageChequeRequests;
