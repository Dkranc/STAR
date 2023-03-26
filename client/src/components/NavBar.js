import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
//mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import AssessmentIcon from "@mui/icons-material/Assessment";
import menuVector from "../image/menuVector.svg";
// const NavBar = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{marginTop:'20px'}} className='navbar' dir='ltr'><KeyboardBackspaceIcon onClick={()=>navigate(-1)}/></div>
//   )
// }

// export default NavBar

export default function NavBar({ setIsAuthenticated, pageName }) {
  const logoutText = "התנתקות";
  const lightModeText = "מצב תאורה";
  const reportsText = "דוחות וסיום אימון";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const reportsClicked = () => {
    navigate("/Charts/ChooseRole", {
      state: {
        soldier: null,
      },
    });
  };

  const logout = () => {
    console.log("logout pressed");
    for (var i = 0; i < sessionStorage.length; i++) {
      var a = sessionStorage.key(i);
      sessionStorage.removeItem(a);
  }
    navigate("/", {
      state: {
        goodLogin: false,
        user:null
      },
    });
    // setIsAuthenticated(false);


    handleCloseMenu();
    //need to navigate to login page
    //and logout of public client
    // and clear the storage
    window.location.reload(false);

  };
  const [openOptionTab, setOpenOptionTab] = useState(false);
  //handle click on menu button in navbar
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //handle close menu

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar dir="rtl" sx={{ flexGrow: 1, justifyContent: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="#000000"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClickMenu} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={logout} dir="rtl">
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">{logoutText}</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu} dir="rtl">
                <ListItemIcon>
                  <LightModeIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">{lightModeText}</Typography>
              </MenuItem>
              <MenuItem onClick={reportsClicked} dir="rtl">
                <ListItemIcon>
                  <AssessmentIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">{reportsText}</Typography>
              </MenuItem>
            </Menu>
          </IconButton>
          <Typography
            fontFamily={"ExtraBold"}
            align="center"
            color="#000000"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {pageName}
          </Typography>
          <KeyboardBackspaceIcon
            style={{ fill: "#000000" }}
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(-1)}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
