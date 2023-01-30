import { React, useState } from "react";
import "./Home.css";
import Welcome from "../components/Welcome";
import { useNavigate } from 'react-router-dom';

const Home = ({setIsAuthenticated }) => {
  const [roles, setRoles] = useState([
    { name: "מפקד", id: 1 },
    { name: "תותחן", id: 2 },
    { name: "טען", id: 3 },
    { name: "נהג", id: 4 },
    { name: "המתאמנים שלי", id: 5 },
  ]);

  const navigate = useNavigate();

  const userRole=sessionStorage.getItem('role');
  return (
    <div dir="rtl">
      <div id="role-btns">
           <Welcome setIsAuthenticated={setIsAuthenticated} />
        {roles.map((role) => {
          if (role.id===5){
            if(userRole==='User.Mashad'){
              return <button key={role.id}>{role.name}</button>;
            } 
          }
           else return <button onClick={()=>navigate(`/TestType/${role.id}`)} key={role.id}>{role.name}</button>;
        })}
      </div>
    </div>
  );
};

export default Home;
