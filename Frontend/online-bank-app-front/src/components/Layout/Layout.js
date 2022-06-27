import styled from "@emotion/styled";
import { Box } from '@mui/material';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const DashboardLayoutRoot = styled("div")(({ theme }) => ({
        display: "flex",
        flex: "1 1 auto",
        maxWidth: "100%",
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
          paddingLeft: 280
        }
      }));


  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            backgroundColor:"neutral.200"
          }}
        >
          <Outlet/>
        </Box>
      </DashboardLayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)}/>
      <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen}/>
    </>
  );
}

export default Layout;
