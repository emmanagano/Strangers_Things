import {  Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, COHORT_NAME } from './api/api';
import './css/ViewPost.css';
import EditPost from './EditPost';

const ViewPost = ({posts,fetchUser}) => {
    const {id} = useParams();
    
    const navigate = useNavigate();


    function postIdMatches(post,id){
        if(post._id === id){
            return true
        } else {
            return false
        }
    }

    const postToView = posts.filter(post => postIdMatches(post,id));
    
    const deleteHandler = async(event) => {
        event.preventDefault();
        const lsToken = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/${COHORT_NAME}/posts/${id}`,{
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${lsToken}`
            },
        });
        
        const info = await response.json();

        if(info.success){
            navigate('/profile')
        }

        fetchUser();
    }

return <div>
        {postToView?.map(view => {
            return <div key={view._id} className='view__section'> 
                   <h2>{view.title}</h2>
                    <div className='view__content'> 
                        <div className='view-details'>
                            <p>{view.description}</p>
                            <p><span>Price:</span> {view.price}</p>
                            <p><span>Seller:</span> {view.author.username}</p>
                            <p><span>Location:</span> {view.location}</p>
                        </div>
                        <div className='button-container'> 
                            <button><Link to={`/posts/${id}/edit`}>Edit</Link></button>
                            <button onClick={deleteHandler}>Delete</button>
                        </div>
                    </div>
            </div>
        })}
        <div>
            <Routes>
                <Route path='edit' element={<EditPost fetchUser={fetchUser} posts={posts}/>}/>
            </Routes>
        </div>
    </div>
}

export default ViewPost;