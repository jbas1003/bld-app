import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../../utils/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { login, loginResult } = useAuthContext();

  function HandleLogin (loginEvent) {
    loginEvent.preventDefault();
    login(username, password);
  }
  return loginResult ? <Navigate to="/admin/dashboard" /> : (
    <>
      <div className='flex items-center justify-center h-screen bg-WhiteSmoke font-alegreya'>
        {/* <div className='flex items-center justify-center'>
          <img src={bldLogo} className="w-60"/>
        </div> */}
        <div className="w-96 p-6 shadow-2xl bg-WhiteSmoke rounded-lg border-solid border border-DarkRed">
          <div className='flex justify-center mb-4'>
            <label className='text-3xl font-semibold text-DarkRed'>Login</label>
          </div>
          <hr className='border-solid border rounded border-DarkRed mb-7'/>

          <form>
            <div className="relative mb-6">
                <input type="text" id="fo_username" className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-DarkRed bg-transparent rounded-lg border-1 border-DarkRed appearance-none focus:outline-none focus:ring-0 focus:border-Red peer" placeholder=" "
                  onChange={e => {setUsername(e.target.value)}}
                />
                <label htmlhtmlFor="fo_username" className="absolute text-xl font-semibold text-DarkRed duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-Red ppeer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"><em>Username</em></label>
            </div>

            <div className="relative mb-6">
              <input type="password" id="fo_password" className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-DarkRed bg-transparent rounded-lg border-1 border-DarkRed appearance-none focus:outline-none focus:ring-0 focus:border-Red peer" placeholder=" "
                onChange={e => {setPassword(e.target.value)}}
              />
              <label htmlhtmlFor="fo_password" className="absolute text-xl font-semibold text-DarkRed duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-Red ppeer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"><em>Password</em></label>
          </div>

          <div className='flex justify-end'>
            <button type='submit' className="text-white bg-DarkRed hover:bg-Red focus:ring-4 focus:outline-none focus:ring-Red font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={HandleLogin}
            >
              Login
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  )
}