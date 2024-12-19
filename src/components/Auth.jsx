import React from 'react'
import { auth , provider } from '../firebase-config.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

import { signInWithPopup }  from 'firebase/auth'

function Auth(props){

    const {setIsAuth} = props;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // console.log(result);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
        <div className='mt-60 md:mt-40 auth text-white font-mono max-h-full flex justify-center items-center'>
        <div className=''>
        <h1 className='font-bold text-3xl mb-6'>Connectify</h1>
            
           <p>Sign In With Google to continue</p>
           <div className='wrap'>

           <button className='text-gray-700 font-mono bg-white m-4 rounded-full button'
            onClick={signInWithGoogle}>Sign In With <img className='ml-1' width={30} height={30} src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png" alt="" /> Google</button>
           </div>
        </div>
        </div>
    )
}

export default Auth;