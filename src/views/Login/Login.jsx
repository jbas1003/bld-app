import { React, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../../utils/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { memberLogin, loginResult } = useAuthContext();

  function HandleLogin (myEvent) {
    myEvent.preventDefault();
    memberLogin(username, password);
  }
  return loginResult ? <Navigate to="/admin/dashboard" /> : (
    <>
      <div className='flex items-center justify-center h-screen bg-WhiteSmoke font-alegreya'>
        <div className='p-6 rounded-lg shadow-2xl flex-column bg-WhiteSmoke w-[500px]'>
          <div className='flex items-center justify-center pb-8'>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                className='h-32 mr-3 text-red-800' viewBox="0 0 539.000000 522.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,522.000000) scale(0.100000,-0.100000)"
                fill="currentColor" stroke="none">
                    <path d="M1840 5180 c-208 -20 -398 -77 -605 -180 -288 -143 -482 -316 -667
                    -595 -271 -408 -382 -845 -338 -1335 18 -191 56 -386 155 -790 124 -508 129
                    -536 129 -750 0 -138 -3 -189 -18 -239 -57 -205 -181 -365 -385 -499 -47 -31
                    -88 -58 -91 -60 -9 -7 60 -60 175 -136 439 -291 912 -455 1535 -533 209 -26
                    794 -26 995 0 734 95 1301 364 1785 847 725 724 1044 1723 743 2325 -121 241
                    -380 452 -635 517 -70 17 -102 20 -213 15 -145 -6 -238 -28 -394 -95 -122 -53
                    -192 -102 -302 -211 -263 -261 -389 -614 -389 -1088 0 -427 -177 -808 -449
                    -967 -240 -140 -518 -139 -921 3 -291 103 -464 116 -705 51 -180 -48 -165 -48
                    -165 -9 0 57 27 164 56 226 36 75 115 158 184 193 69 34 76 36 243 55 304 35
                    469 112 526 245 32 75 46 196 32 288 -24 163 -98 274 -372 557 -202 209 -236
                    260 -264 392 -62 291 85 646 342 830 70 50 177 99 240 109 l40 6 -28 -84 c-41
                    -123 -60 -218 -66 -343 -13 -260 64 -457 232 -595 99 -81 159 -151 201 -235
                    87 -176 82 -360 -20 -650 -19 -55 -33 -102 -31 -104 8 -7 192 159 300 270 284
                    294 471 606 557 929 28 104 31 133 36 313 7 292 -21 453 -108 629 -54 108 -90
                    159 -185 257 -151 157 -376 307 -558 370 -178 62 -407 89 -597 71z m335 -1087
                    c25 -87 79 -182 156 -275 174 -210 201 -247 238 -318 21 -41 46 -99 55 -129
                    30 -101 18 -262 -31 -421 l-17 -55 -7 76 c-9 86 -41 174 -90 246 -18 26 -83
                    100 -144 163 -60 63 -125 138 -142 165 -70 110 -103 277 -83 415 10 70 39 190
                    46 190 1 0 10 -26 19 -57z m-751 -246 c-93 -259 -59 -547 89 -742 25 -33 74
                    -84 110 -113 102 -82 234 -219 284 -295 63 -95 93 -183 93 -279 0 -42 -4 -80
                    -10 -83 -5 -3 -10 0 -10 7 0 29 -61 140 -102 184 -47 51 -102 91 -248 179
                    -190 114 -286 213 -361 370 -100 207 -89 466 28 663 35 59 141 187 149 180 2
                    -2 -8 -34 -22 -71z"/>
                </g>
            </svg>
          </div>
          <div>
            <hr className='border border-solid rounded border-DarkRed'/>
            <div className='flex justify-center mt-3 mb-4'>
              <label className='text-3xl font-semibold text-DarkRed'>Login</label>
            </div>
            <hr className='border border-solid rounded border-DarkRed mb-7'/>

            <form>
              <div className="relative mb-6">
                  <input type="text" id="fo_username" className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-DarkRed bg-transparent rounded-lg border-1 border-DarkRed appearance-none focus:outline-none focus:ring-0 focus:border-Red peer" placeholder=" "
                    onChange={e => {setUsername(e.target.value)}}
                  />
                  <label htmlFor="fo_username" className="absolute text-xl font-semibold text-DarkRed duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-Red ppeer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"><em>Username</em></label>
              </div>

              <div className="relative mb-6">
                <input type="password" id="fo_password" className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-DarkRed bg-transparent rounded-lg border-1 border-DarkRed appearance-none focus:outline-none focus:ring-0 focus:border-Red peer" placeholder=" "
                  onChange={e => {setPassword(e.target.value)}}
                />
                <label htmlFor="fo_password" className="absolute text-xl font-semibold text-DarkRed duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-Red ppeer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"><em>Password</em></label>
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
      </div>
    </>
  )
}