import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupPage = () => {

  const [formData, setFormData] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  
  const {register}= useAuth();
  const navigate = useNavigate()



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await register(formData)
    alert(res.message);
     if (res.success) navigate("/login");
    console.log("Form submitted", formData);
  };

  return (
    <div className='login-container'>
      <div className="login-box-content">
        <div className="logo-box">
          <h2>Logo</h2>
        </div>

        <div className="form-box">
          <form onSubmit={handleSubmit}>

            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
            />

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
