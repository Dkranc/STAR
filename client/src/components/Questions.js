import { React, useState, useEffect } from "react";
import QuestionMap from "../components/QuestionMap";
import "./Questions.css";

const Questions = ({
  questions,
  categories,
  answers,
  setAnswers,
  comments,
  setComments,
  isMashadTest,
  loaded,
}) => {
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    var dict2 = {};
    questions.map((question) => {
      // this sets the initial answers object to empty strings
      dict2[question.name] = "";
    });

    var dict3 = {};
    categories.map((cat) => {
      dict3[cat.id] = false;
    });

    setComments(dict2);
    setOpenCategories(dict3);
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
  };

  return !loaded ? (
    <h4>loading...</h4>
  ) : (
    <div id="main_questions">
      {isMashadTest ? (
        questions.map((question) => {
          return (
            <QuestionMap
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
        <div id="categories" dir="rtl">
          {categories.map((category) => {
            return (
              <div dir="rtl" id="category" key={category.id}>
                <h4
                  onClick={() => {
                    setOpenCategories({
                      ...openCategories,
                      [category.id]: !openCategories[category.id],
                    });
                  }}
                >
                  {category.text}
                </h4>
                {questions.map((question) => {
                  if (openCategories[question.parent_id] && !isMashadTest) {
                    return (
                      <QuestionMap
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Questions;
