import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SelectSoldiers from "../pages/SelectSoldiers";

const SolPopUp = ({ role, chosenSoldiers, setChosenSoldiers }) => {
  return (
    <Popup
      trigger={<button> בחר חייל לתפקיד: {role} </button>}
      position="left center"
      closeOnDocumentClick
    >
      <div>
        <SelectSoldiers
          setChosenSoldiers={setChosenSoldiers}
          chosenSoldiers={chosenSoldiers}
          role={role}
        />
      </div>
    </Popup>
  );
};

export default SolPopUp;
