import { useState, } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, COHORT_NAME } from "./api/api";


const EditPost = ({posts,fetchUser}) => {

    const navigate = useNavigate();

    const {id} = useParams();

    function postIdMatches(post,id){
        if(post._id === id){
            return true
        } else {
            return false
        }
    }

    const postToView = posts.filter(post => postIdMatches(post,id));    

    const [editTitle,setEditTitle] = useState(postToView[0]?.title);
    const [editDescription,setEditDescription] = useState(postToView[0]?.description);
    const [editPrice, setEditPrice] = useState(postToView[0]?.price);
    const [editLocation,setEditLocation] = useState(postToView[0]?.location);
    const [editDeliver,setEditDeliver] = useState(postToView[0]?.willDeliver);


    const editHandler = async (event) => {
        event.preventDefault();
        const lsToken = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/${COHORT_NAME}/posts/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${lsToken}`
            },
            body: JSON.stringify({
                post: {
                  title: `${editTitle}`,
                  description: `${editDescription}`,
                  price: `${editPrice}`,
                  location: `${editLocation}`,
                  willDeliver: `${editDeliver}`,
                }
            })
        })
        const info = await response.json();
        
        if(info.success === true){
            navigate('/profile')
        }
        
        fetchUser();
    }

    

    return <div className='add-post__container'>
    <div className='add-post__main'>
        <h2>Edit Post</h2>
        <form 
            onSubmit={editHandler}
        >
            <input type='text' placeholder='Title*' 
                value={editTitle}
                onChange={event => {
                    setEditTitle(event.target.value);
                }}>
            </input>
            <input type='text' placeholder='Description*'
                value={editDescription}
                onChange={event => {
                    setEditDescription(event.target.value); 
                }}/>
            <input type='text' placeholder='Price*'
                value={editPrice}
                onChange={event => {
                    setEditPrice(event.target.value); 
                }}/>
            <input type='text' placeholder='Location*'
                value={editLocation}
                onChange={event => {
                    setEditLocation(event.target.value);
                }}/>
            <div className='willing-deliver'>
                <input id='deliver' type='checkbox' 
                    value={editDeliver}
                    onChange={event => {
                        setEditDeliver(editDeliver);
                    }}/>
                <label>Willing to deliver?</label>
            </div>
            <button type='submit'>EDIT</button>
        </form> 
    </div>
</div>
}

export default EditPost;