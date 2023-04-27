import React from "react";
import GeneralInput from "./GeneralInput";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";

const CompanyChoice = ({ user, setUser }) => {
  const questions = [
    { name: "פלוגה 1", id: 1 },
    { name: "פלוגה 2", id: 2 },
    { name: "פלוגה 3", id: 3 },
  ];
  const categories = [];
  return (
    <Box >
      <NavBar setUser={setUser} user={user} pageName={"הזנת נתוני פלוגה"} />
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <GeneralInput questions={questions} categories={categories} sx={{margin:'20px'}}/>
      </Box>
    </Box>
  );
};

export default CompanyChoice;
