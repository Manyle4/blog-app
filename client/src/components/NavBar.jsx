import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [ prompt, setPrompt ] = useState("");
  const [ menu, setMenu ] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <div className='bg-yellow-400 flex'>
      <h1 className='text-gray-50'>Logo</h1>
      {
        path === "/" && <div onChange={(e) => {setPrompt(e.target.value)}} className='flex'>
          <input type="text" placeholder='Search for a post...' value={prompt}/>
          <p onClick={() => {navigate(prompt ? '?search' + prompt : navigate("/"))}}>🍳</p>
        </div>
      }
    </div>
  )
}

export default NavBar
