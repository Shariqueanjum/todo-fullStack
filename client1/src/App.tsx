import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList';
import { RecoilRoot } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { authState } from './store/authState';
function App() {
  return(
    <RecoilRoot>

    <Router>
         <InitState />
    <Routes>
       
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/todos' element={<TodoList />} />
        <Route path='/' element={<Login />} />
    </Routes>


    </Router>

    </RecoilRoot>
  )
}

function InitState() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
      const token = localStorage.getItem("token");
      try {
          const response = await fetch('http://localhost:3000/user/me', {
              headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.username) {
              setAuth({ token: data.token, username: data.username });
              console.log(data.username,"this is username");
              navigate("/todos");
          } else {
             navigate("/login");
          }
      } catch (e) {
          navigate("/login");
      }
  }

  useEffect(() => {
      init();
  }, [])

  return (
  <></>
  )
}

export default App

