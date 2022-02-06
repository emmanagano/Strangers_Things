import {  useState } from "react";
import './css/Posts.css';
import { BiMessageDetail } from "react-icons/bi";
import { Link } from "react-router-dom";


const Posts = ({user,posts,fetchUser}) => {
    const [searchTerm,setSearchTerm] = useState('');

    function postMatches(post,searchTerm) {
        if(searchTerm === "") {
            return false
        } else if(post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true
        } else if(post.description.toLowerCase().includes(searchTerm.toLowerCase())){
            return true
        } else if(post.price.toLowerCase().includes(searchTerm.toLowerCase())){
            return true
        } else if(post.location.toLowerCase().includes(searchTerm.toLowerCase())){
            return true
        } else if(post.author.username.toLowerCase().includes(searchTerm.toLowerCase())){
            return true
        }
    }

    const filteredPosts = posts.filter(post => postMatches(post,searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    console.log(user)
    
    return <>
        <div className='form__container'>
            <h2>POSTS</h2>
            <form className='form__main'>
                <input  
                    type='text' 
                    placeholder='Search Posts'
                    value={searchTerm}
                    onChange={event => {setSearchTerm(event.target.value)}}
                />
            </form>
            {user.username &&  <Link to='/posts/add'>(ADD POST)</Link>}
        </div>
        {postsToDisplay.map((post) => {
            console.log(post.isAuthor)
            return <div key={post._id} className='post__section'>
                <h2>{post.title}</h2>
                <div className='post__content'>
                    <div>
                        <p>{post.description}</p>
                        <p><span>Price:</span> {post.price}</p>
                        <p><span>Seller:</span> {post.author.username}</p>
                        <p><span>Location:</span> {post.location}</p>
                    </div>
                    <div>
                        {!post.isAuthor && <button type='button' className='message-button'><Link to={`/posts/${post._id}/message`}><BiMessageDetail/></Link></button>}  
                    </div>
                </div>
                {post.author._id === user._id && <Link 
                    onClick={event => fetchUser()}
                    className='view-button' 
                    to={`/posts/${post._id}`}>
                    (VIEW POST)
                </Link>}
            </div>
        })}
    </>
}


export default Posts;


