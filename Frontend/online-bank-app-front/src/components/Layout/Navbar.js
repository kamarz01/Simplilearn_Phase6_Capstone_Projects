import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = (props) => {
  const { onSidebarOpen } = props;
  const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  }));

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Kamar Online Banking Solutions">
            <IconButton sx={{ ml: 1 }}>
              <Typography variant="h6">Welcome to our online banking solution</Typography>
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />         
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

export default Navbar;
