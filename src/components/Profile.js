import { Link } from "react-router-dom";



const Profile = ({user}) => {

    const seller = user.username;

    return <>
        <div className='form__container'>
            <h2>YOUR POSTS</h2>
        </div>
        {user.posts?.map((user,index) => {
            return <div key={index}>
            {user.active && 
                <div key={user._id} className='post__section'>
                    <h2>{user.title}</h2>
                    <div className='post__content'>
                        <div>
                        <p>{user.description}</p>
                            <p><span>Price:</span> {user.price}</p>
                            <p><span>Seller:</span> {seller}</p>
                            <p><span>Location:</span> {user.location}</p>
                        </div>
                    </div>
                    <Link className='view-button' to={`/posts/${user._id}`}>(VIEW POST)</Link>
                </div>
            }
            </div>
        })}
    </>
}

export default Profile;