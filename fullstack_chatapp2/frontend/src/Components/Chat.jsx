/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket,name, roomid}) => {
    const [currentMsg, setCurrentMsg] = useState("");
    const [msgList, setMsgList] = useState([]);

    const sendMessage = async()=>{
        if(currentMsg !==""){
            const messageData = {
                roomid:roomid,
                name:name,
                message:currentMsg,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit('send_msg',messageData);
            setMsgList((list)=>[...list,messageData]);
            setCurrentMsg("");
        }
    }

    useEffect(()=>{
        socket.off("receive_msg").on("receive_msg",(data)=>{
            setMsgList((list)=>[...list,data]);
        });
    },[socket]);

  return (
    <div className='m-auto w-3/5 h-96 mt-9 bg-white shadow-md rounded-md'>
        <ScrollToBottom className='message-container' >
            <div className='flex border  h-96 rounded-md flex-col'>
                {msgList && msgList.map((msg,index)=>{
                    return(
                        <div key={index} id={name === msg.name ? "you" : "other"}>
                            <p className='msg_content'>{msg.message}</p>
                            <p className='name_time'>{msg.name} - {msg.time}</p>
                        </div>
                    )
                })}
            </div>
        </ScrollToBottom>

        <div className='m-2 border border-purple-600 rounded-md border-x-4 '>
            <input
            type='text'
            value={currentMsg}
            placeholder='Enter message...'
            className=' text-purple-500 placeholder:text-purple-500 italic pl-1 outline-none text-xl'
            onChange={(e)=>{setCurrentMsg(e.target.value)}}
            onKeyDown={(e)=>{
                e.key == 'Enter' && sendMessage();
            }}
            />
            <button onClick={sendMessage} className='flex float-right ml-2 w-8 h-7 justify-center text-white text-xl italic text-center bg-purple-600 hover:bg-purple-400 rounded-sm'> {'>'} </button>
        </div>
    </div>
  )
}

export default Chat