import React, { useState,useEffect } from "react";
import style from './register.module.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { fontSize } from "@mui/system";
import axios from "../../utility/axios";
import toast,{ Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Register() {
  const [contact, setContact] = useState({
    Name: "",
    email: "",
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

  const handleRegister = async () => {
    try {
      await axios.post('user/register', {
        username: contact.Name,
        email: contact.email,
        password: contact.password,
      })
      toggle(true)
      navigate('/')
    } catch (error) {
      toast.error('register error')
    }
  }

  function showHide() {
  setView(current => !current)
  }

  useEffect(() => {
    document.body.classList.add(style.regis);

    return function cleanup() {
      document.body.classList.remove(style.regis);
    };
  }, []);

  console.log(password)
  return (
    <div className={style.container}>
      <h1>Hello {contact.Name}</h1>
      <p style={{margin:"0px"}}>{contact.email}</p>
        <input
          className={style.input}
          onChange={handleChange}
          name="Name"
          value={contact.Name}
          placeholder="Username"
        />
        <input
          className={style.input}
          onChange={handleChange}
          name="email"
          value={contact.email}
          placeholder="Email"
        />
        <div className="password">
        <input
          className={style.input}
          style={{display:"inline-block"}}
          name="password"
          onChange={handleChange}
          value={contact.password}
          placeholder="Password"
          type={password? "password" : "text"}
        /> 
        <i title="Show and Hide Password" className={style["see-password"]} onClick={showHide}><RemoveRedEyeOutlinedIcon sx={{ fontSize: "2.5rem" }}/></i>
        </div>
        <button className={style.button} onClick={handleRegister}>Sign me up!</button>
    </div>
  );
}

export default Register;