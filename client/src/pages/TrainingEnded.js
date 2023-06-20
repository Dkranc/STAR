import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "@mui/material/Button";

const TrainingEnded = () => {



    const location = useLocation();
    const navigate= useNavigate();
    const failedToSend= location.state.failedToSend;

    console.log(failedToSend);

    const  homeClicked = () => {
    navigate(`/Home`, {
      state: {
        soldiers: location.state.soldiers,
      },
    });
  };

  return (
    <div>
       
       {failedToSend.length!==0? 
        <div><h2>  שגיאה בשליחת הקבצים אל:</h2>
        <ul>
        {failedToSend.map(soldier=>{
        <li>{ soldier.first_name+soldier.last_name +': '+soldier.soldier_serial_id}</li>
       })}</ul></div>:
       <div><h2>הכל נשלח בהצלחה</h2></div>

    }
       

      <Button
      variant="outlined"
      sx={{
        fontSize: "20px",
        borderColor: "#2ED573",
        color: "rgb(0,0,0)",
        background:
          "linear-gradient(275.76deg, #2ED573 44.33%, #7BED9F 98.56%)",
        boxShadow: "inset 5px 5px 10px rgba(46, 213, 115, 0.15)",
        width: "90%",
        mt: 2,
        borderRadius: 30,
        fontFamily: "Bold",
      }}
      onClick={()=>homeClicked()}
    >
      {"אל מסך הבית"}
    </Button>
    </div>
  );
};

export default TrainingEnded;
