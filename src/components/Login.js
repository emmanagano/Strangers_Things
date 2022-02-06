import { Link } from 'react-router-dom';
import { BASE_URL, COHORT_NAME } from './api/api';
import './css/Login.css';



const Login = ({username,password,setUsername,setPassword,user,setToken,setUser,fetchUser}) => {

    const loginHandler = async (event) => {
        event.preventDefault();
        
        const response = await fetch(`${BASE_URL}/${COHORT_NAME}/users/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })

        const info = await response.json();
        
        setToken(info.data.token);
        localStorage.setItem('token',info.data.token);

        fetchUser();
    }

    return <div className='login__main'>
        <div className='login__container'>
            {!user.username && <h2>Log In</h2>}
            {user.username && <div className='logged-in__main'>
                <h3>You are currently logged in as </h3>
                <p>{user.username}</p>
                <button onClick={(event) => {
                    setToken('');
                    setUser({});
                    localStorage.removeItem('token');
                    setUsername('');
                    setPassword('');
                }}>LOG OUT</button>
            </div>}
            {!user.username && <form>
                <input 
                    required
                    type='text' 
                    placeholder='Username*' 
                    value={username} 
                    onChange={event => {setUsername(event.target.value)}}/>
                <input 
                    required
                    type='password' 
                    placeholder='Password*' 
                    value={password}
                    onChange={event => {setPassword(event.target.value)}}/>
                <button onClick={loginHandler}>LOG IN</button>
                <Link to='/account/register'>Don't have an account? Signup</Link>
            </form> }
        </div>
    </div>
}

export default Login;