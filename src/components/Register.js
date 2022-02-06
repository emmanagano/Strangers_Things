import {  useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './css/Login.css';
import {BASE_URL,COHORT_NAME} from './api/api';

const Register = ({setToken,username,password,setUsername,setPassword}) => {
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError] = useState('');
    const [userData,setUserData] = useState({});

    const navigate = useNavigate();


    const registerHandler = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            setError('Password does not match')
        }

        const response = await fetch(`${BASE_URL}/${COHORT_NAME}/users/register`,{
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
        });

        const info = await response.json();

        setUserData(info);

        if(info.success === false){
            setError('Account already exists!')
        }

        setToken(info.data.token);
        localStorage.setItem('token', info.data.token);

        setUsername('')
        setPassword('')

    }

    if(userData.success === true){
        navigate('/account/login');
    }


    return <div className='login__main'>
        <div className='login__container'>
            <h2>Sign up</h2>

            <p className='error-message'></p>
            <p className='error-message'>{error}</p>
            <form onSubmit={registerHandler}>
                <input 
                    required
                    type='text' 
                    placeholder='Username*' 
                    value={username} 
                    onChange={event => {setUsername(event.target.value)}}
                />
                <input 
                    required
                    type='password' 
                    placeholder='Password*' 
                    value={password}
                    onChange={event => {setPassword(event.target.value)}}
                />
                {password.length !== 0 && <input 
                    required
                    type='password'
                    placeholder='Confirm Password*'
                    value={confirmPassword}
                    onChange={event => {setConfirmPassword(event.target.value)}}/>}
                <button>REGISTER</button>
                <Link to='/account/login'>Already have an account? Log in</Link>
            </form> 
        </div>
    </div>
}

export default Register;