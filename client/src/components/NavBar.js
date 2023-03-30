import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import jwtDecode from "jwt-decode";
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
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import menuVector from "../image/menuVector.svg";

export default function NavBar({ user, setUser, pageName }) {
  const logoutText = "התנתקות";
  const lightModeText = "מצב תאורה";
  const reportsText = "דוחות וסיום אימון";
  const addEditSoldierText = "הוספת/עריכת נתוני חיילים";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(jwtDecode(jwtDecode(sessionStorage.getItem("token")).secret));
    // if (user) {
    //   const decodedJwt = JSON.parse(atob(token.split('.')[1]));

    //   if (decodedJwt.exp * 1000 < Date.now()) {
    //     props.logOut();
    //   }
    // }
  }, []);

  const reportsClicked = () => {
    navigate("/Charts/ChooseRole", {
      state: {
        soldier: null,
      },
    });
  };

  const addEditClicked = () => {
    navigate("/AddEditSoldiers", {
      state: {},
    });
  };

  const logout = () => {
    console.log("logout pressed");
    console.log(user);

    for (var i = 0; i < sessionStorage.length; i++) {
      var a = sessionStorage.key(i);
      console.log(sessionStorage.key(i));
      sessionStorage.removeItem(a);
    }
    console.log(sessionStorage);
    setUser(null);
    navigate("/", {
      state: {
        goodLogin: false,
        user: null,
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
              {user.roles[0] === "User.Admin" ? (
                <MenuItem onClick={addEditClicked} dir="rtl">
                  <ListItemIcon>
                    <LibraryAddIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    {addEditSoldierText}
                  </Typography>
                </MenuItem>
              ) : null}
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
