import {React} from 'react';
import {useNavigate} from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div style={{marginTop:'20px'}} className='navbar' dir='ltr'><KeyboardBackspaceIcon onClick={()=>navigate(-1)}/></div>
  )
}

export default NavBar