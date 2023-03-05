import { React, useState, useEffect } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./GeneralInput.css";

const GeneralInput = ({ questions, categories }) => {
  useEffect(() => {}, []);

  return <div id="general-input">
  <ul id="general-input-questions">
     {questions.map((question)=>{

         return (
           <li dir="rtl">{question.text} <ArrowBackIosNewIcon/></li>
         )
        
     })}
     </ul>
  </div>;
};

export default GeneralInput;
