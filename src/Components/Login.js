import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: 'POST',

      headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
  });
    const json = await response.json();
    console.log(json);
    if (json.success){
        // Save the authtoken and redirect
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Logged in successfully", "success");
        navigate("/");
    }
    else{
      props.showAlert("Invalid credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}
  return (
    <div className="container">
      <h2 className='my-4'>Login to Notebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}
