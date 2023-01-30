import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import "./Questionary.css";
import axios from 'axios';
import Questions from '../components/Questions';

const Questionary = () => {
     
    const testTypeId = useParams();
    const [questions, setQuestions]= useState([])
    const [answers, setAnswers] = useState({});
    const [comments, setComments] = useState({});
    const [error, setError]= useState(false);

    const handleSubmit=(e)=>{
      for (let i in answers) {
       if(answers[i]==='' || answers[i]>100||answers[i]<0) setError(true);//bad answers
       else{

       }
    }


    }

    useEffect(() => {
         axios.get(`http://localhost:8080/api/tests/question/${testTypeId.ttid}`).then((response) => {
            setQuestions(response.data);
          });
    }, []);


  return (
    <div>
    {//need to get soldiers information
    }
    <Questions questions={questions} answers={answers}  setAnswers={setAnswers}
comments={comments} setComments={setComments} />
    <button id="submit" onClick={(e)=>handleSubmit(e)} >שלח</button>
    {error? <p dir='rtl' style={{color:'red'}}>שגיאה, נא ודא הזנה נכונה</p> : null}
    </div>
  )
}

export default Questionary