import { React, useState, useEffect } from "react";

const Questions = ({
  questions,
  answers,
  setAnswers,
  comments,
  setComments,
}) => {
  useEffect(() => {
    var dict = {};
    questions.map((question) => {
      // this sets the initial answers object to empty strings
      dict[question.name] = "";
    });

    setAnswers(dict);
    setComments(dict);
  }, [questions]);

  const handleFormChange = (event) => {
    let data = answers;
    data[event.target.name] = event.target.value;
    setAnswers(data);
  };

  const handleCommentChange = (event) => {
    let data = comments;
    data[event.target.name] = event.target.value;
    setComments(data);
    console.log(comments);
  };

  return (
    <div dir="rtl" id="questions">
      {questions.map((question) => {
        return (
          <div className="question" key={question.id}>
            <p style={{fontWeight:'bold'}}>{question.text}</p>
            {question.input_type === "boolean" ? (
              <div>
                <div dir="rtl" className="bool_quest">
                  <div className="bool-answer">
                    <input
                      type="radio"
                      name={question.name}
                      value="true"
                      onChange={(e) => handleFormChange(e)}
                    />
                    <p>בוצע</p>{" "}
                  </div>
                  <div className="bool-answer">
                    {" "}
                    <input
                      type="radio"
                      name={question.name}
                      value="false"
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
              <div>
                <div className="numeric" dir="rtl">
                  {[...Array(10)].map((e, i) => (
                    <button
                      key={"ans" + question.name + (i + 1).toString()}
                      onClick={(e) => handleFormChange(e)}
                      className="btn-score"
                      value={i + 1}
                      name={question.name}
                    >
                      {i + 1}
                    </button>
                  ))}
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
                    value={answers[0]}
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
        );
      })}
    </div>
  );
};

export default Questions;
