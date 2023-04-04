import { React, useEffect } from "react";
import { Button, Box, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { textAlign } from "@mui/system";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const QuestionMap = ({
  question,
  answers,
  comments,
  handleCommentChange,
  handleFormChange,
  loaded,
}) => {
  useEffect(() => {}, [loaded, answers]);

  return (
    <Box>
      {answers[question.name] !== undefined ? (
        <Box className="question" key={question.id}>
          <p style={{ fontWeight: "bold", fontFamily: "bold" }}>
            {question.name}
            {console.log(question.name, answers[question.name])}
          </p>
          {question.input_type === "boolean" ? (
            <Box>
              <Box dir="rtl" className="bool_quest">
                <Box className="bool-answer">
                  <RadioGroup
                    row={true}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={answers[question.name]}
                    onChange={() =>
                      (answers[question.name] = !answers[question.name])
                    }
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="בוצע"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="לא בוצע"
                    />
                  </RadioGroup>

                  <input
                    type="radio"
                    defaultChecked={answers[question.name] === 1}
                    name={question.name}
                    value={false}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <p>בוצע</p>
                </Box>
                <Box className="bool-answer">
                  <input
                    type="radio"
                    defaultChecked={answers[question.name] === 0}
                    name={question.name}
                    value={false}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <p>לא בוצע</p>
                </Box>
              </Box>
              <Box className="comment">
                <TextareaAutosize
                  style={{
                    boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.25)",
                    fontFamily: "Regular",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  dir="rtl"
                  size="sm"
                  placeholder="הערות"
                  minRows={2}
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                />
              </Box>
            </Box>
          ) : null}

          {question.input_type === "numeric" ? (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{ display: "flex", width: "100%" }}
                className="numeric"
                dir="rtl"
              >
                {[...Array(10)].map((e, i) => (
                  <Button
                    sx={{
                      minWidth: "0%",
                      fontSize: "20px",
                      backgroundColor: "#D9D9D9",
                      color: "black",
                    }}
                    key={"ans" + question.name + (i + 1).toString()}
                    onClick={(e) => {
                      handleFormChange(e);
                    }}
                    style={{
                      backgroundColor:
                        answers[question.name] === i + 1 ? "#2ED573" : "",
                    }}
                    className="btn-score"
                    value={i + 1}
                    name={question.name}
                  >
                    {i + 1}
                  </Button>
                ))}
              </Box>

              {/* <p>הערות</p> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  size="small"
                  placeholder="הערה"
                  dir="rtl"
                  style={{
                    fontFamily: "Light",
                  }}
                  sx={{
                    width: "100%",
                    marginY: "5%",
                    borderRadius: 30,
                    background: "white",
                    boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
                  }}
                  type="text"
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                  id="outlined-basic"
                />
              </Box>
            </Box>
          ) : null}

          {question.input_type === "open-numeric" ? (
            <Box display="flex" flexDirection="column">
              <Box className="numeric" dir="rtl" marginBottom="5%">
                <TextField
                  sx={{
                    fontFamily: "Light",
                    width: "100%",
                    borderRadius: 30,
                    background: "white",
                    boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)",
                  }}
                  placeholder="ציון מ1 עד 100"
                  size="small"
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  name={question.name}
                  value={answers[question.name]}
                  onChange={(e) => handleFormChange(e)}
                />
              </Box>
              <Box sx={{ width: "100%" }} className="comment">
                <TextareaAutosize
                  style={{
                    boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.25)",
                    fontFamily: "Regular",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  dir="rtl"
                  size="sm"
                  placeholder="הערות"
                  minRows={2}
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                />

                {/* <TextField
                  type="text"
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                /> */}
              </Box>
            </Box>
          ) : null}
        </Box>
      ) : (
        <h4>loading</h4>
      )}
    </Box>
  );
};

export default QuestionMap;
