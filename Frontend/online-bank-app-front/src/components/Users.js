import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
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

const Users = () => {
  const userData = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigator("/");
    }
    axios
      .get("http://localhost:9999/api/admin/getAllUsers")
      .then((response) => {
        if (response.data.code && response.data.code === 200) {
          setUsers(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);
  const handleUserDataNotFound = () => {
    localStorage.clear();
    navigator("/");
  };
  const updateState = (userId) => {
    axios
      .post(`http://localhost:9999/api/admin/changeUserState/${userId}`)
      .then((response) => {
        if (response.data.data) {
          setUsers(response.data.data);
        }
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Manage Users" />
                  <Divider />
                  <CardContent>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User Id</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Username</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Primary Account</TableCell>
                          <TableCell>Saving Account</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users &&
                          users.length > 0 &&
                          users
                            .filter((u) => u.type === "user")
                            .map((user,index) => (
                              <TableRow key={index}>
                                <TableCell>{user.userId}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                  {user.userAccounts.length > 0 &&
                                    user.userAccounts.filter(
                                      (acc) => acc.accountName === "Primary"
                                    )[0].accountId}
                                </TableCell>
                                <TableCell>
                                  {user.userAccounts.length > 0 &&
                                    user.userAccounts.filter(
                                      (acc) => acc.accountName === "Saving"
                                    )[0].accountId}
                                </TableCell>
                                <TableCell>
                                  {user.enabled
                                    ? "Active/Enabled"
                                    : "Disabled/Locked"}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => updateState(user.userId)}
                                    variant="contained"
                                    color={user.enabled ? "error" : "success"}
                                  >
                                    {user.enabled
                                      ? "Disable/Lock"
                                      : "Enable/Unlock"}
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

export default Users;
