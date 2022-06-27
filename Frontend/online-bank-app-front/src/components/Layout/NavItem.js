import { Button, ListItem, Box } from "@mui/material";
import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavItem = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { href, icon, title } = props;
  const active = href ? location.pathname === href : false;

  const handleNaviagte = (href) => {
    navigate(href);
  }

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
      >
        <Button
          onClick={() => handleNaviagte(href)}
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </ListItem>
    </>
  );
};

export default NavItem;
