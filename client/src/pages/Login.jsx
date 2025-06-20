import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      alert('Login Successfully');
      navigate('/');
    } catch {
      alert('Login Failed');
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow w-80 mx-auto my-8"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          className="border p-2 w-full mb-2"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-4"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
