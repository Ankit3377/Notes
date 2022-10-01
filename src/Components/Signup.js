import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the authtoken and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account created successfully", "success");
      navigate("/");
    }
    else {
      props.showAlert("Invalid credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className="container">
      <h2 className='my-4'>Create an account in Notebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" name='name' id="name" aria-describedby="nameHelp" value={credentials.name} onChange={onChange} minLength={3} required/>
          </div>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}