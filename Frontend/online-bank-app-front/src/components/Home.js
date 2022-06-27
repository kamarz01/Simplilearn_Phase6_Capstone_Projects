import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.user.user);
  const navigator = useNavigate();
  useEffect(() => {
    document.body.style.backgroundColor = "#E5E7EB";
    if (!localStorage.getItem("userId")) {
      navigator("/");
    }
  }, []);

  const handleUserDataNotFound = () => {
    localStorage.clear();
    navigator("/");
  };
  return (
    <>
      {!userData && handleUserDataNotFound()}
      {(userData && userData.type === "user") && (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
                        >
                          Primary Account Balance
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                          $
                          {
                            userData.userAccounts.filter(
                              (acc) => acc.accountName === "Primary"
                            )[0].accountBalance
                          }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            backgroundColor: "primary.main",
                            height: 56,
                            width: 56,
                          }}
                        >
                          <AttachMoneyIcon />
                        </Avatar>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
                        >
                          Saving Account Balance
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                          $
                          {
                            userData.userAccounts.filter(
                              (acc) => acc.accountName === "Saving"
                            )[0].accountBalance
                          }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            backgroundColor: "warning.main",
                            height: 56,
                            width: 56,
                          }}
                        >
                          <SavingsIcon />
                        </Avatar>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Grid item>
                        <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
                        >
                          Cheque Books
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                          {userData.chequeRequests.length}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            backgroundColor: "secondary.main",
                            height: 56,
                            width: 56,
                          }}
                        >
                          <MenuBookIcon />
                        </Avatar>
                      </Grid>
                    </Grid>
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

export default Home;
