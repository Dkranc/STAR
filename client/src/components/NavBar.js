import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import HomeIcon from "@mui/icons-material/Home";
import { useIdleTimer } from "react-idle-timer";
import { ThemeProvider } from "@mui/material/styles";
import { themeLight, themeDark } from "../theme.js";

export default function NavBar({
  user,
  setUser,
  pageName,
  lightMode,
  setLightMode,
}) {
  const location = useLocation();
  const [remaining, setRemaining] = useState(0);
  const logoutText = "התנתקות";
  const lightModeText = "מצב תאורה";
  const reportsText = "דוחות וסיום אימון";
  const addEditSoldierText = "הוספת/עריכת נתוני חיילים";
  const backHomeText = "חזור למסך הבית";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const pathname = window.location.pathname;

  const onIdle = () => {
    logout("timer");
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: 600000, //this logs out aftr 10 minutes of non use
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const reportsClicked = () => {
    navigate("/Charts/ChooseRole", {
      state: {
        soldier: null,
      },
    });
  };

  const homeClicked = () => {
    navigate("/", {
      state: {},
    });
  };

  const addEditClicked = () => {
    navigate("/AddEditSoldiers", {
      state: { soldiers: location.state.soldiers },
    });
  };
  const lightModeClicked = () => {
    console.log(lightMode);
    // setLightMode(!lightMode);
  };
  const logout = (auto) => {
    window.alert(
      auto === "user" ? "התנתקות מוצלחת" : "המערכת מתנתקת עקב חוסר פעילות"
    );

    for (var i = 0; i < sessionStorage.length; i++) {
      var a = sessionStorage.key(i);
      console.log(sessionStorage.key(i));
      sessionStorage.removeItem(a);
    }
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
    handleCloseMenu();
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
          {pathname !== "/" ? (
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
                <MenuItem
                  onClick={() => {
                    logout("user");
                  }}
                  dir="rtl"
                >
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
                {user.roles[0] === "User.Admin" ? (
                  <div>
                    <MenuItem onClick={reportsClicked} dir="rtl">
                      <ListItemIcon>
                        <AssessmentIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography variant="inherit">{reportsText}</Typography>
                    </MenuItem>
                    {location.pathname === "/Home" ? (
                      <MenuItem onClick={addEditClicked} dir="rtl">
                        <ListItemIcon>
                          <LibraryAddIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">
                          {addEditSoldierText}
                        </Typography>
                      </MenuItem>
                    ) : null}
                  </div>
                ) : null}

                <MenuItem onClick={homeClicked} dir="rtl">
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{backHomeText}</Typography>
                </MenuItem>
              </Menu>
            </IconButton>
          ) : null}

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
