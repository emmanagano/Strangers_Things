import { useParams } from "react-router-dom";
import './css/Posts.css';
import {BiSend} from 'react-icons/bi';
import { BASE_URL, COHORT_NAME } from "./api/api";
import { useState } from "react";



const Message = ({posts,fetchUser}) => {

    const {id} = useParams();

    const [message,setMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    function postMessage(post,id){
        if(post._id === id){
            return true
        } else {
            return false
        }
    }

    const sendMessage = posts.filter(post => postMessage(post,id));

    const messageHandler = async (event) => {
        event.preventDefault();
        const lsToken = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/${COHORT_NAME}/posts/${id}/messages`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${lsToken}`
            },
            body: JSON.stringify({
                message: {
                  content: `${message}`
                }
            })
        })
        const info = await response.json();
        
        if(info.success){
            setSuccessMessage('Message Sent!')
        } else if(!info.success){
            setSuccessMessage('Sent Failed: User must be signed in')
        }

        fetchUser();
        setMessage('');
    }

    return <>
        {sendMessage.map(post => {
            return <div key={post._id} className='post__section'>
                <h2>{post.title}</h2>
                <div className='post__content'>
                    <div>
                        <p>{post.description}</p>
                        <p><span>Price:</span> {post.price}</p>
                        <p><span>Seller:</span> {post.author.username}</p>
                        <p><span>Location:</span> {post.location}</p>
                    </div>
                </div>
                <div className='message__container'>
                    <input 
                        type='text'
                        placeholder='Send a messsage...'
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />
                    <button onClick={messageHandler} className='reply-button' type='button'><BiSend/></button>
                    <div className='success-message__container'>
                        <h3>{successMessage}</h3>
                    </div>
                </div>
            </div>
        })}
    </>
}

export default Message;