import { React, useEffect } from "react";
import { TextField } from "@mui/material";
import {Box} from "@mui/material";
import {Button} from "@mui/material";
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
    <div>
      {answers[question.name] !== undefined ? (
        <div className="question" key={question.id}>
          <p style={{ fontWeight: "bold", fontFamily:'bold' }}>{question.name}</p>
          {question.input_type === "boolean" ? (
            <div>
              <div dir="rtl" className="bool_quest">
                <div className="bool-answer">
                  <input
                    type="radio"
                    defaultChecked={answers[question.name] === 1}
                    name={question.name}
                    value={true}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <p>בוצע</p>
                </div>
                <div className="bool-answer">
                  <input
                    type="radio"
                    defaultChecked={answers[question.name] === 0}
                    name={question.name}
                    value={false}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <p>לא בוצע</p>
                </div>
              </div>
              <div className="comment">
                <p>הערות</p>
                <input
                  type="text"
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                />
              </div>
            </div>
          ) : null}

          {question.input_type === "numeric" ? (
            <Box sx={{width:'100%'}}>
              <Box  sx={{display:'flex', width:'100%'}} className="numeric" dir="rtl">
                {[...Array(10)].map((e, i) => (
                  <Button
                    sx={{minWidth:'0%',fontSize:'20px',backgroundColor:"#D9D9D9",color:'black'}}
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
                <Box  sx= {{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <TextField 
                size="small"
                placeholder="הערה"
                dir="rtl"
                sx={{fontFamily: "Light",width:"100%",marginY:'5%',borderRadius: 30,background: "white", boxShadow: "inset 2px 2px 4px rgba(0, 0, 0, 0.25)"}}
                type="text"
                name={question.name}
                value={comments[0]}
                onChange={(e) => {
                  handleCommentChange(e);
                }}
                id="outlined-basic"  />
                </Box>

                {/* <input
                  type="text"
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                /> */}
              
            </Box>
          ) : null}

          {question.input_type === "open-numeric" ? (
            <div>
              <div className="numeric" dir="rtl">
                <p>ציון מ1 עד 100</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  name={question.name}
                  value={answers[question.name]}
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div className="comment">
                <p>הערות</p>

                <input
                  type="text"
                  name={question.name}
                  value={comments[0]}
                  onChange={(e) => {
                    handleCommentChange(e);
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <h4>loading</h4>
      )}
    </div>
  );
};

export default QuestionMap;
