import { Link } from 'react-router-dom'
import './css/Home.css'

const Home = ({user}) => {
    
    const myId = user?._id;

    function isNotMe (myId,other) {
        if(myId !== other){
            return true
        } else {
            return false;
        }
    }

    function isMe (myId,other) {
        if(myId === other){
            return true
        } else {
            return false
        }
    }    


    const myUserId = user.messages?.filter(detail => isMe(myId,detail.fromUser._id));
    const otherUserId = user.messages?.filter(detail => isNotMe(myId,detail.fromUser._id));


    return <main className='home__container'>
        <h1>Welcome to Stranger's Things {user.username}!</h1>
        <div className='view-messages__container'>
            <h3>Sent Messages:</h3>
            {myUserId?.map(message => {
                return <div key={message._id} className='each-message__container'>
                    <div>
                        <p><span>From: </span>{message.fromUser.username}</p>
                        <p><span>Message: </span>{message.content}</p>
                        <Link to={`/posts/${message.post._id}/message`}>{message.post.title}</Link>
                    </div>
                </div>
            })}  
        </div>
        <div className='view-messages__container'>
            <h3>Received Messages:</h3>
            {otherUserId?.map(message => {
                return <div key={message._id} className='each-message__container'>
                    <div>
                        <p><span>From: </span>{message.fromUser.username}</p>
                        <p><span>Message: </span>{message.content}</p>
                        <Link to={`/posts/${message.post._id}/message`}>{message.post.title}</Link>
                    </div>
                </div>
            })}
        </div>
    </main>
}


export default Home;