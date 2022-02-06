import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, COHORT_NAME } from './api/api';
import './css/AddPost.css'


const AddPost = ({user,fetchPosts}) => {
    const navigate = useNavigate();
    
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [location,setLocation] = useState('');
    const [deliver,setDeliver] = useState(false);
  



    const addPostHandler = async (event) => {
        event.preventDefault();
        const lsToken = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/${COHORT_NAME}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${lsToken}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver:`${deliver}`,
                    author: {
                        _id: `${user.id}`,
                        username: `${user.username}`
                    }
                }
            }),
        })

        const info = await response.json();

        setTitle('')
        setDescription('')
        setPrice('')
        setLocation('')
        setDeliver(false)

        if(info.success === true){
            navigate('/posts')
        }

        fetchPosts();

        return info;

    }


    return <div className='add-post__container'>
        <div className='add-post__main'>
            <h2>Add a New Post</h2>
            <form>
                <input type='text' placeholder='Title*' 
                    value={title}
                    onChange={event => {setTitle(event.target.value)}}/>
                <input type='text' placeholder='Description'
                    value={description}
                    onChange={event => {setDescription(event.target.value)}}/>
                <input type='text' placeholder='Price*'
                    value={price}
                    onChange={event => {setPrice(event.target.value)}}/>
                <input type='text' placeholder='Location*'
                    value={location}
                    onChange={event => {setLocation(event.target.value)}}/>
                <div className='willing-deliver'>
                    <input id='deliver' type='checkbox' 
                        value={deliver}
                        onChange={event => {
                            setDeliver(!deliver);
                        }}/>
                    <label>Willing to deliver?</label>
                </div>
                <button onClick={addPostHandler}>CREATE</button>
            </form> 
        </div>
    </div>
}

export default AddPost;