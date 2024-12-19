import { useState, useRef } from 'react'
import './App.css'
import Auth from './components/Auth'
import Chat from './components/Chat'
import Cookies from 'universal-cookie';

import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
const cookies = new Cookies();



function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }


  return (
    <>
      {room ?
        (
          <Chat room={room} />
        ) : (
          <div className='max-h-screen  flex justify-center items-center mt-32'>

            <div className='room text-white  '>
              <label className=' font-mono font-bold text-xl'>Enter Room Name :</label>
              <br />
              <input className='m-4 rounded-full text-black text-center p-2 border-none focus:outline-none caret-blue-700 caret-' ref={roomInputRef} />
              <br />
              {/* <button 
            onClick={()=> setRoom(roomInputRef.current.value)}
            >
            Enter Chat
            </button> */}
              <button onClick={() => setRoom(roomInputRef.current.value)} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-100 transition duration-300 ease-out border-2 border-teal-500 rounded-full shadow-md group">
                <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-teal-500 group-hover:translate-x-0 ease">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span class="absolute flex items-center justify-center w-full h-full text-purple-100 transition-all duration-300 transform group-hover:translate-x-full ease">Enter In Chat</span>
                <span class="relative invisible">Enter In Chat</span>
              </button>
            </div>
          </div>
        )}
      <div className='sign-out text-white mt-10'>
        <button className='bg-red-600 p-3 rounded-full font-bold duration-1000 transition-all hover:bg-white hover:text-red-600' onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  )
}

export default App
