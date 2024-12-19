import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase-config'


function Chat(props) {

    const { room } = props;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", '==', room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(messages);

            // console.log("new message");  
        });

        return () => unsuscribe()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        // console.log(newMessage);
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");

    }
    return (

        <>

            <div className='flex justify-center items-center'>

                <div className='chat-app '>
                    <div className='header text-white'>
                    <h1 className='font-bold text-2xl mb-2 font-mono'>Connectify</h1>
                        <h1 className='font-bold mb-10 font-mono'>
                            Welcome to :- {room}
                        </h1>
                    </div>
                    <div className='messages text-white border
                 p-4 text-left rounded-lg shadow-md shadow-slate-100 overflow-auto max-h-72 '>
                        {messages.map((message) =>
                            <div className='message ' key={message.id}>
                                <span className='user text-bold text-gray-400 font-medium '>{message.user} : </span>
                                {message.text}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className='new-message-form flex justify-center items-center'>
                        <input className='new-message-input rounded-full m-4 px-10 py-2' placeholder='Type your message here...'
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                        {/* <button type='submit' className='send-button text-white'>
                    Send
                    </button> */}
                        <button class="relative inline-flex items-center px-10 py-2 overflow-hidden text-lg font-medium text-teal-100 border-2 border-teal-600 rounded-full hover:text-white group hover:bg-gray-50">
                            <span class="absolute left-0 block w-full h-0 transition-all bg-teal-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg width="800px" height="800px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">

                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                    <g id="SVGRepo_iconCarrier"> <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#ffffff" stroke-width="0.768" stroke-linecap="round" stroke-linejoin="round" /> </g>

                                </svg>
                            </span>
                            <span class="relative ">Button Text</span>
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Chat;