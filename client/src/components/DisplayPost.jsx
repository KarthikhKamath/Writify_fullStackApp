import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PostCard from './PostCard';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

function DisplayPost() {
    const [posts, setPosts] = useState([])
    // const { auth } = useContext(AuthContext)
    const navigator = useNavigate()
    const { auth } = useContext(AuthContext)


    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const res = await fetch("https://mern-stack-blogger.onrender.com/api/blog/", {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    // console.log("postpage", data);
                    setPosts(data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
        // console.log("calling");
    }, []);


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap:"wrap",
                justifyContent:"center",
                margin: "auto",
                gap: 3,
                alignItems:"center",
            }}
        >
            {posts.map(post => (
                <Box key={post.title} sx={{ maxWidth: "550px", width: "100%" }}>
                    <PostCard post={post} />
                </Box>
            ))}
        </Box>
    );
}

export default DisplayPost;
