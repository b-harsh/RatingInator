import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful. You can log in.');
      navigate('/login');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow w-80 mx-auto my-8"
    >
      <h2 className="text-xl font-bold mb-4">Signup</h2>
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
      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
