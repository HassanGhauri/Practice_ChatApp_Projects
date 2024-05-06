/* eslint-disable no-unused-vars */
import { useState } from 'react'
import io from 'socket.io-client';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Chat from './Components/Chat';

const socket = io.connect('http://localhost:3000/');
function App() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat,setShowChat] = useState(false);

  const joinRoom = (e)=>{
    if(name !== "" && roomId !== ""){
      socket.emit('join_room',roomId);
      setShowChat(true);
    }
  }

  return (
    <div>
      <Header />
      <div>
      {!showChat ? (
        <div className='m-auto w-96 h-96 bg-white mt-32 shadow-md rounded-md'>
          <div className='inline-flex justify-center items-center ml-20 mt-28 space-y-2 flex-col'>
            <h2 className=' text-purple-600 italic text-center text-3xl mb-5'>Join A Chat Room:</h2>
            <input
            type='text'
            value={name}
            placeholder='Enter name...'
            onChange={(e)=>{setName(e.target.value)}}
            className='border border-purple-500 pl-1 outline-none caret-purple-400 text-purple-400 rounded-sm placeholder:text-purple-400 italic'
            /><br/>
            <input      
            type='text'
            value={roomId}
            placeholder='Enter RoomID...'
            onChange={(e)=>{setRoomId(e.target.value)}}
            className='border border-purple-500 pl-1 outline-none caret-purple-400 text-purple-400 rounded-sm placeholder:text-purple-400 italic'
            />
            <button onClick={joinRoom} className=' w-9 h-6 shadow-md hover:bg-purple-700 rounded-md bg-purple-600 text-white'>Join</button>
          </div>
        </div>
        ):(
          <Chat socket={socket} name={name} roomid={roomId} />
        )}
        </div>

      <Footer />
    </div>
  )
}

export default App
