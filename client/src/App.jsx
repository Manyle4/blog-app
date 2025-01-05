import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import MyBlogs from './pages/MyBlogs';
import Profile from './pages/Profile';

import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/post/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myblogs/:id" element={<MyBlogs />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
