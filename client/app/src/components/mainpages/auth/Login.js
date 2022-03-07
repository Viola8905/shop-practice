import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const onChangeInput = e => {
		const {name, value} = e.target;
		setUser({...user, [name]:value})
	}
	const loginSubmit = async e => {
		e.preventDefault()
		try{
			await axios.post("http://localhost:5000/user/login", { ...user });
			localStorage.setItem('firstLogin', true)

			window.location.href='/'
		}catch(err){
			alert(err.response.data.msg)
		}
	}
	return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
				<h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
					onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
					onChange={onChangeInput}
					autoComplete='on'
        />

				<div className="row">
					<button className="submit">Login</button>
					<Link to='/register'>Register</Link>
				</div>
      </form>
    </div>
  );
}

export default Login