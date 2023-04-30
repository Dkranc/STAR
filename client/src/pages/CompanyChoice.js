import React, { useState } from "react";
import GeneralInput from "./GeneralInput";
import NavBar from "../components/NavBar";
import { Box } from "@mui/system";

const CompanyChoice = ({ user, setUser }) => {
  const [questions, setQuestions] = useState([
    { name: "פלוגה 1", id: 1, plooga_name: null },
    { name: "פלוגה 2", id: 2, plooga_name: null },
    { name: "פלוגה 3", id: 3, plooga_name: null },
  ]);
  function handleQuestionChange(number, plooga_name) {
    questions[number - 1].plooga_name = plooga_name;
    console.log(questions);
  }
  const categories = [];
  return (
    <Box>
      <NavBar setUser={setUser} user={user} pageName={"הזנת נתוני פלוגה"} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <GeneralInput
          handleQuestionChange={setQuestions}
          questions={questions}
          categories={categories}
          sx={{ margin: "20px" }}
        />
      </Box>
    </Box>
  );
};

export default CompanyChoice;
