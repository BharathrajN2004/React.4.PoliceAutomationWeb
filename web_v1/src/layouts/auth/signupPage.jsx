import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { BsFillPersonFill } from 'react-icons/bs';
import { MdOutlineAlternateEmail, MdOutlineLocalPolice, MdOutlinePassword, MdLocationCity } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';
import { createUser } from '../../firebase/auth';
import { addUser } from '../../firebase/addUser';
import logo from "../../assets/img/logo.png";
import { ACCESSLEVEL } from 'variables/static';

function SignupPage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [_accessLevel, setAccessLevel] = useState('choose');
    const [stationCode, setStationCode] = useState('');

    const handleSignup = async () => {
        if (name !== '' && email !== '' && password !== '' && confirmPassword !== "") {
            if (password === confirmPassword) {
                createUser(email, password).then((success) => {
                    if (success) {
                        addUser(email.toLowerCase(), name, password, profile, _accessLevel, stationCode).then((success) => success && navigate('/admin/default'));
                    }
                });
            } else {
                alert("Confirm Password entered is not the same as Password");
            }
        } else {
            alert("Please enter all the details");
        }
    }

    return (
        <>
            <div className="flex flex-col min-h-full items-center justify-center px-2 py-8 lg:px-4 bg-slate-100">
                <div className="sm:max-w-3xl">
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

                <div className="mt-6 w-full px-4 sm:w-9/12 md:w-8/12 ">

                    <label htmlFor="profile">
                        <div className='flex flex-col justify-center items-center w-full mb-6'>
                            <p className='block mb-2 text-sm font-medium text-gray-900'>Profile Image</p>
                            {profile === "" ?
                                <BsPersonCircle className='w-16 h-16 text-gray-800' /> :
                                <img className="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300" src={URL.createObjectURL(profile)} alt="add profile image" />
                            }
                            <input id="profile" type="file" className="hidden" onChange={(event) => setProfile(event.target.files[0])} />
                        </div>
                    </label>

                    <div className=' sm:flex justify-around items-center sm:gap-4 md:gap-6'>
                        <div className='w-full'>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <div className="flex mb-4">
                                <span className="inline-flex items- center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                    <BsFillPersonFill className="w-4 h-4 text-gray-500" />
                                </span>
                                <input type="text" id="name" value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Enter your name" />
                            </div>
                        </div>
                        <div className='w-full'>
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
                    </div>

                    <div className=' sm:flex justify-around items-center sm:gap-4 md:gap-6'>
                        <div className='w-full'>
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
                        <div className='w-full'>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                            <div className="flex mb-4">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                    <MdOutlinePassword className="w-4 h-4 text-gray-500" />
                                </span>
                                <input type="password" id="confirmPassword" value={confirmPassword}
                                    onChange={(event) => setconfirmPassword(event.target.value)}
                                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5" placeholder="Reenter your password" />
                            </div>
                        </div>
                    </div>

                    <div className=' sm:flex justify-around items-center sm:gap-4 md:gap-6'>
                        <div className='w-full'>
                            <label htmlFor="accessLevel" className="block mb-2 text-sm font-medium text-gray-900">Access Level</label>
                            <div className="flex mb-4">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border  border-gray-300 rounded-l-md">
                                    <MdOutlineLocalPolice className="w-4 h-4 text-gray-500" />
                                </span>
                                <label htmlFor="accessLevel" className="sr-only">Choose a state</label>
                                <select value={_accessLevel} onChange={(event) => setAccessLevel(event.target.value)} id="accessLevel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value='choose'>Choose an AccessLevel</option>
                                    {Array.from(ACCESSLEVEL).map((value, index) => {
                                        return <option value={value} key={value}>{value.toUpperCase()}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="station" className="block mb-2 text-sm font-medium text-gray-900">Station code <span className='text-xs text-gray-500'>(For lower access only)</span></label>
                            <div className="flex mb-4">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                    <MdLocationCity className="w-4 h-4 text-gray-500" />
                                </span>
                                <input type="text" id="station" value={stationCode}
                                    onChange={(event) => setStationCode(event.target.value)}
                                    className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                                    placeholder="Enter station code" disabled={_accessLevel === ACCESSLEVEL ? true : false} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 sm:px-20'>
                        <button
                            type="submit"
                            onClick={handleSignup}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account ?{'  '}
                        <Link to={'/auth/Login'} >
                            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignupPage;
