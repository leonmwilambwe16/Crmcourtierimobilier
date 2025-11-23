import React, { useState, type FormEvent } from 'react'
import '../styles/login.style/Login.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface LoginForm{
  email:string;
  password:string;
}

const LoginPage = () => {
 
  const [formData,setFormData]= useState<LoginForm>({
    email:"",
    password:""
  });

  const [closePage,setClosePage]= useState<boolean>(false);
  
  const {login}=useAuth()
  const navigate = useNavigate()




  const closeBtn=()=>{
    setClosePage(!closePage)
  }
   
  const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
    const{name,value} = e.target;
    setFormData(prev=>({
      ...prev,[name]:value
    }))
  }

  const handleSubmit = async (e:FormEvent)=>{
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    alert(res.message);
    if (!res.success) return;

    const user = JSON.parse(localStorage.getItem("user")!);
    if (user.role === "CLIENT") navigate("/client-dashboard");
    if (user.role === "COURTIER") navigate("/courtier-dashboard");
    if (user.role === "ADMIN") navigate("/manager-dashboard");
    console.log("Fom submitted",formData)
  }


  return (
    <div className='login-container' onClick={closeBtn}>
      <div className="login-box-content">
       <div className="logo-box">
         <h2>Logo</h2>
      </div>
        <div className="form-box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='enter your email'/>
          <label htmlFor="">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='enter your email' />
          <button>Login</button>
        </form>
      </div>
      </div>
     
   
    </div>
  )
}

export default LoginPage