import { React, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  Autocomplete,
  TextField,
  Collapse,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import QuestionMap from "../components/QuestionMap";

const get_ans_count = (item) => {
  var ans_count = 0;
  for (const [key, value] of Object.entries(item)) {
    if (value != "undefined") {
      ans_count++;
    }
  }
  return ans_count;
};
const GeneralPopUp = ({
  isMashadTest,
  questions,
  answers,
  comments,
  handleCommentChange,
  handleFormChange,
  loaded,
  categories,
  openCategories,
  setOpenCategories,
}) => {
  const [openSelected, setOpenSelected] = useState(true);
  const [textColor, setTextColor] = useState("black");

  return (
    <Box id="main_questions">
      {isMashadTest ? (
        questions.map((question) => {
          return (
            <QuestionMap
              sx={{ padding: "10%" }}
              question={question}
              answers={answers}
              comments={comments}
              handleCommentChange={handleCommentChange}
              handleFormChange={handleFormChange}
              loaded={loaded}
            />
          );
        })
      ) : (
        <Box
          width="100%"
          sx={{
            borderRadius: "30px",
            border: "none",
          }}
          id="categories"
          dir="rtl"
        >
          {categories.map((category) => {
            return (
              <Box
                marginTop={"5%"}
                dir="rtl"
                id="category"
                key={category.id}
                sx={{
                  border: "none",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Button
                  edge="start"
                  style={{ fontFamily: "Regular" }}
                  sx={{
                    justifyContent: "space-between",
                    fontSize: "20px",
                    width: "100%",
                    color: textColor,
                    backgroundColor: "white",
                    borderRadius: "30px",
                    display: "flex",
                  }}
                  endIcon={
                    openCategories[category.id] ? (
                      <Box>
                        {get_ans_count(answers)}/{Object.keys(answers).length}
                        <ArrowDropUpIcon />
                      </Box>
                    ) : (
                      <Box>
                        {get_ans_count(answers)}/{Object.keys(answers).length}
                        <ArrowDropDownIcon />
                      </Box>
                    )
                  }
                  onClick={() => {
                    setOpenCategories({
                      ...openCategories,
                      [category.id]: !openCategories[category.id],
                    });
                  }}
                >
                  {category.name}
                  {/* <Typography visibility={"hidden"}>invisble</Typography>
                  <Typography visibility={"hidden"}>invisble</Typography>
                  <Typography visibility={"hidden"}>invisble</Typography> */}
                  {/* <Typography fontWeight={"Regular"}>
                    {get_ans_count(answers)}/{Object.keys(answers).length}
                  </Typography> */}
                </Button>

                <Collapse
                  sx={{ padding: "5%" }}
                  orientation={"vertical"}
                  in={openCategories[category.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  {questions.map((question) => {
                    if (openCategories[question.parent_id] && !isMashadTest) {
                      return (
                        <QuestionMap
                          key={question.id}
                          question={question}
                          answers={answers}
                          comments={comments}
                          handleCommentChange={handleCommentChange}
                          handleFormChange={handleFormChange}
                          loaded={loaded}
                        />
                      );
                    } else return null;
                  })}
                </Collapse>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
export default GeneralPopUp;
