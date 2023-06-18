import React from "react";
import NavBar from "../components/NavBar";
import SelectSoldiers from "./SelectSoldiers/SelectSoldiers";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import { useNavigate, useLocation } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import GroupAdd from "@mui/icons-material/GroupAddTwoTone";
import { Button } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

const AddEditSoldiers = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <NavBar user={user} setUser={setUser} pageName={"הוספת חיילים ועריכה"} />
      <SelectSoldiers user={user} addEdit={true} />
      {user.roles[0] === "User.Admin" ? (
        <Box
          sx={{
            alignContent: "center",

            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
            margin: "0px",
            top: "auto",
            right: "auto",
            bottom: "75px",
            left: "20px",
          }}
        >
          <Fab
            sx={{
              marginRight: "10px",
              background:
                "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
              borderColor: "#2ED573",
              boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
            }}
            aria-label="add"
          >
            <PersonAddAltOutlinedIcon
              onClick={() => {
                navigate(`/AddEditSoldiers/AddEditPage`, {
                  state: {
                    soldiers: location.state.soldiers,
                  },
                });
              }}
            />
          </Fab>

          <div>
            {/**            <Button
              onClick={() => {
                navigate("/CompanyChoice");
              }}
              style={{
                fontWeight:"bold",
                height: "50px",
                borderRadius: "30px",
                background:
                  "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
                color: "black",
              }}
            >
              <p>הזנת שיוך פלוגתי</p>
            </Button> */}
          </div>
        </Box>
      ) : null}
    </div>
  );
};

export default AddEditSoldiers;
