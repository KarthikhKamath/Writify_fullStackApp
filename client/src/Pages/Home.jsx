import React, { useContext, useEffect } from 'react'
import DisplayPost from '../components/DisplayPost.jsx'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App.js';


function Home() {
 

  return (
    <div>
        <DisplayPost/>
    </div>
  )
}

export default Home