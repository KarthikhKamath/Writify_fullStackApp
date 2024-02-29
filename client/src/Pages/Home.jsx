import React, { useContext, useEffect, useState } from 'react';
import DisplayPost from '../components/DisplayPost.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App.js';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup timeout on component unmount or when post data is loaded
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div className="allPosts" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <DisplayPost />
      )}
    </div>
  );
}

export default Home;
