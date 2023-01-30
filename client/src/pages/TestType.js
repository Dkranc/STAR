import { React, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TestType = () => {
  const [tests, setTests] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const roleId = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tests/test_types/${roleId.rid}`)
      .then((response) => {
        setTests(response.data);
        setLoaded(true);
      });
    console.log(tests);
  }, [loaded]);

  return (
    <div className="test-types">
      {loaded ? (
       <p>this is here</p>
        
      ) : (
        <p>loding...</p>
      )}
      {
        tests.map((test)=>{
            <button className="test-type-btn" key={test.id} value={test.name}>
            {test.name}
          </button>
        })
      }
    </div>
  );
};

export default TestType;
