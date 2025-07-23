import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token);
      alert('Signup successful! You can now log in.');
    } catch (error) {
      alert('Signup failed! Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-wowktm-primary mb-6">
          Sign Up
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
          <button
            onClick={handleSignup}
            className="w-full bg-wowktm-primary text-white p-3 rounded-xl hover:bg-wowktm-secondary"
          >
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-wowktm-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;