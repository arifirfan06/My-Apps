import React, { useState,useEffect } from "react";
import style from './login.module.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { fontSize } from "@mui/system";
import axios from "../../utility/axios";
import toast,{ Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
    const [contact, setContact] = useState({
      Name: "",
      password: ""
    });
  
    const [signIn, toggle] = useState(true)
  
    const [password, setView] = useState(true)
  
    function handleChange(event) {
      const { name, value } = event.target;
      setContact((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        };
      });
    }
  
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const { data } = await axios.post('/user/login', {
              username: contact.Name,
              password: contact.password,
            })
            localStorage.setItem('_q', data.accessToken)
            toggle(true)
            navigate("/")
          } catch (error) {
            toast.error('login error')
          }
        }

    function showHide() {
    setView(current => !current)
    }

    useEffect(() => {
      document.body.classList.add(style.signin);

      return function cleanup() {
        document.body.classList.remove(style.signin);
      };
    }, []);

    console.log(signIn)
    return (
      <div className={style.container}>
        <h1>Hello {contact.Name}</h1>
          <input
            className={style.input}
            onChange={handleChange}
            name="Name"
            value={contact.Name}
            placeholder="Username"
          />
          <div>
          <input
            className={style.input}
            name="password"
            onChange={handleChange}
            value={contact.password}
            placeholder="Password"
            type={password? "password" : "text"}
          /> 
          <i title="Show and Hide Password" className={style["see-password"]} onClick={showHide}>{password === true?  <RemoveRedEyeOutlinedIcon sx={{ fontSize: "2.5rem" }}/>: <VisibilityOffIcon sx={{ fontSize: "2.5rem" }}/>}</i>
          </div>
          <button className={style.button} onClick={handleLogin}>Sign in</button>
      </div>
    );
}
  export default Login;