import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddPost from './components/AddPost';
import { BASE_URL, COHORT_NAME} from './components/api/api';
import Home from './components/Home';
import Login from './components/Login';
import Message from './components/Message';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Profile from './components/Profile';
import Register from './components/Register';
import ViewPost from './components/ViewPost';



function App() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const [token,setToken] = useState('');
  const [user,setUser] = useState({});

  const [posts,setPosts] = useState([]);



  const fetchPosts = async () => {
    const lsToken = localStorage.getItem('token');

    const response = lsToken ? 
      await fetch(`${BASE_URL}/${COHORT_NAME}/posts`,{
        method:'GET',
        headers: {
          'Authorization': `Bearer ${lsToken}`
        }
      })
      : 
      await fetch(`${BASE_URL}/${COHORT_NAME}/posts`)
    ;

    const data = await response.json();
    setPosts(data.data.posts);
  }

  
  const fetchUser = async () => {
    const lsToken = localStorage.getItem('token');
    if(lsToken){
      setToken(lsToken)
    }
    const response = await fetch(`${BASE_URL}/${COHORT_NAME}/users/me`,{
      headers: {
        'Authorization': `Bearer ${lsToken}`
      }
    })

    const info = await response.json();
    
    if(info.success){
      setUser(info.data)
    }
    return info;
  }

  useEffect(() => {
    fetchPosts();
    fetchUser();
  },[])

  return <>

    <Navbar user={user}/>

    <Routes>

      <Route exact path='/' element={<Home 
        user={user}
        />}
      />



      <Route path='posts' element={<Posts 
        user={user}
        posts={posts}
        fetchUser={fetchUser}
        />} 
      />

      <Route path='profile' element={<Profile
        user={user}
        />}
      
      />

      <Route path='account/login' element={<Login
        username={username} 
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
        user={user}
        token={token}
        setToken={setToken}
        fetchUser={fetchUser}
        />} 
      />

      <Route path='account/register' element={<Register 
        username={username} 
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setToken={setToken}
        />} 
      />

      <Route path='posts/add' element={<AddPost 
        user={user}
        fetchPosts={fetchPosts}
        />}
      />

      <Route path='posts/:id/*' element={<ViewPost
        posts={posts}
        fetchUser={fetchUser}
      />}/> 

      <Route path='posts/:id/message' element={<Message
        posts={posts}
        fetchUser={fetchUser}
        />}
      />

    </Routes>
    </>
}

export default App;

