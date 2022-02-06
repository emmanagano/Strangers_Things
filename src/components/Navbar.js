import { Link } from "react-router-dom";
import './css/Navbar.css';


const Navbar = ({user}) => {
    return <div className='navbar'>
        <div>
            <h1>Stranger's Things</h1> 
        </div>
        <div className='navbar__link'>
            <Link to='/'>HOME</Link>
            <Link to='/posts'>POSTS</Link>
            {user.username && <Link to='/profile'>{user.username}</Link>}
            <Link to='/account/login'>LOGIN</Link>
        </div>
    </div>
}

export default Navbar;