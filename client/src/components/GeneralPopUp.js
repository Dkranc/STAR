import { React, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Autocomplete, TextField, Collapse, Button, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import QuestionMap from "../components/QuestionMap";

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
            backgroundColor: "white",
            borderRadius: "30px",
            border: "none",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
          }}
          id="categories"
          dir="rtl"
        >
          {categories.map((category) => {
            return (
              <Box marginTop={"5%"} dir="rtl" id="category" key={category.id}>
                <Button
                  style={{ fontFamily: "Regular" }}
                  sx={{
                    fontSize: "20px",

                    color: "black",
                    backgroundColor: "white",
                    radius: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                  endIcon={
                    openCategories[category.id] ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
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
