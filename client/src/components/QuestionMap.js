import { React, useEffect } from "react";

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
          <p style={{ fontWeight: "bold" }}>{question.name}</p>
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
            <div>
              <div className="numeric" dir="rtl">
                {[...Array(10)].map((e, i) => (
                  <button
                    key={"ans" + question.name + (i + 1).toString()}
                    onClick={(e) => {
                      handleFormChange(e);
                    }}
                    style={{
                      backgroundColor:
                        answers[question.name] === i + 1 ? "green" : "",
                    }}
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
