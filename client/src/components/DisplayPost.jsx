import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function DisplayPost() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useContext(AuthContext)
    const navigator = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://vercel-backend-writify.vercel.app/api/blog/", {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setPosts(data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchData();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: "auto",
                gap: 3,
                width: "100%",
                alignItems: "center",
            }}
        >
            {isLoading ? (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    {/* Loading Spinner */}
                    <div className="loading-spinner"></div>
                    <p>Loading....</p>
                </div>
            ) : posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map(post => (
                    <Box key={post.title} sx={{ minWidth: "300px", width: "30%" }}>
                        <PostCard post={post} />
                    </Box>
                ))
            )}
        </Box>
    );
}

export default DisplayPost;
