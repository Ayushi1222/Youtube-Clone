import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const { login } = useContext(AuthContext);
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

if (password !== confirmPassword) {
setError('Passwords do not match');
return;
}

setLoading(true);

try {
const { user, token } = await register(username, email, password);
login(user, token);
navigate('/');
} catch (err) {
setError(err.message || 'Registration failed. Please try again.');
} finally {
setLoading(false);
}
};

return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
<div className="max-w-md w-full space-y-8">
<div>
  <div className="flex justify-center">
    <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"></path>
    </svg>
  </div>
  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
  <p className="mt-2 text-center text-sm text-gray-600">
    Or{' '}
    <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
      sign in to your account
    </Link>
  </p>
</div>

{error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{error}</span>
  </div>
)}

<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
  <div className="rounded-md shadow-sm -space-y-px">
    <div>
      <label htmlFor="username" className="sr-only">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="email-address" className="sr-only">Email address</label>
      <input
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password" className="sr-only">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
      <input
        id="confirm-password"
        name="confirm-password"
        type="password"
        autoComplete="new-password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  </div>

  <div>
    <button
      type="submit"
      disabled={loading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {loading ? (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
      Register
    </button>
  </div>
</form>
</div>
</div>
);
};

export default Register;