import React from "react";
import GeneralInput from "./GeneralInput";
import NavBar from "../components/NavBar";

const CompanyChoice = ({ user, setUser }) => {
  const questions = [
    { name: "פלוגה א", id: 1 },
    { name: "פלוגה ב", id: 2 },
    { name: "פלוגה ג", id: 3 },
  ];
  const categories = [];
  return (
    <div>
      <NavBar setUser={setUser} user={user} pageName={"הזנת נתוני פלוגה"} />
      <GeneralInput questions={questions} categories={categories} />
    </div>
  );
};

export default CompanyChoice;
