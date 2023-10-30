import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineAlternateEmail } from 'react-icons/md';
import { MdOutlinePassword } from 'react-icons/md';

import { signIn } from "../../firebase/auth";
import logo from "../../assets/img/logo.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      signIn(email, password).then((success) =>
        success && navigate('/admin/default')
      );
    } else {
      alert("Please enter all the details");
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 bg-slate-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-br from-teal-300 to-green-400'>CAMAT</span>
          </h2>
          <h5 className="mt-1 text-center text-base font-bold leading-9 tracking-tight text-gray-700">Your Secured and Automated Case Management System!</h5>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <div className="flex mb-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                <MdOutlineAlternateEmail className="w-4 h-4 text-gray-500" />
              </span>
              <input type="email" id="email" value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Enter your email" />
            </div>
          </div>

          <div className='mt-4'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="flex mb-4">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                <MdOutlinePassword className="w-4 h-4 text-gray-500" />
              </span>
              <input type="password" id="password" value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Enter your password" />
            </div>
          </div>

          <div className='mt-8'>
            <button
              type="submit"
              onClick={handleLogin}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
            >
              Login
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account ?{'  '}
            <Link to={'/auth/Signup'} >
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Signup
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
