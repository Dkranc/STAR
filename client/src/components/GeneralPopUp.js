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

const filterObjectByValue = (myObject, acceptedValues) => {
  const asArray = Object.entries(myObject); //object to iter array
  var filtered = asArray.filter(
    ([key, value]) => value["parent_id"] === acceptedValues[0]
  ); //filter by parent it of category
  return filtered;
};

const getAnswerCount = (answers, myObject) => {
  const asArray = Object.entries(answers); //object to iter array

  var filteredAnswer = asArray.filter(([key, value]) => value !== "undefined"); //filter by answer defined

  let arr = []; //from array of array to one array
  filteredAnswer.forEach((array) => {
    arr = arr.concat(array);
  });

  //check if answer in each category
  var filterByAnswered = myObject.filter(([key, value]) =>
    arr.includes(value["name"])
  );

  return filterByAnswered;
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
  const [answersLength, setAnswersLength] = useState(
    Object.keys(answers).length
  );
  const [answersCheckedLength, setAnswersCheckedLength] = useState(0);

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
            console.log("cat", category);
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
                        {
                          getAnswerCount(
                            answers,
                            filterObjectByValue(questions, [category.id])
                          ).length
                        }
                        /{filterObjectByValue(questions, [category.id]).length}
                        <ArrowDropUpIcon />
                      </Box>
                    ) : (
                      <Box>
                        {
                          getAnswerCount(
                            answers,
                            filterObjectByValue(questions, [category.id])
                          ).length
                        }
                        /{filterObjectByValue(questions, [category.id]).length}
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
                   
                    if (
                      category.id === question.parent_id &&
                      openCategories[question.parent_id] &&
                      !isMashadTest
                    ) {
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
