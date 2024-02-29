import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function CreatePost() {
    const [write, setWrite] = useState({ title: "", image: "", content: "" });
    const navigator = useNavigate()
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setWrite({ ...write, [name]: value });
    };
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        // Check if user is authenticated
        if (!auth) {
            // Redirect to /login if not authenticated
            navigator('/login');
        }
    }, [auth]);

    const handleSubmit = useCallback(async () => {
        console.log(write);
        const res = await fetch("https://mern-stack-blogger.onrender.com/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(write)
        });

        const data = await res.json();
        if (res.ok) {
            console.log(data);
            alert("Blog created");
            setWrite({ title: "", image: "", content: "" });
        } else {
            console.log(data);
        }
        navigator("/")
    }, [write]);

    return (
        <Card sx={{ mt: 2, maxWidth: "500px", margin: " auto", padding: 4, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)" }} elevation={3}>
            <CardContent sx={{}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: "poppins", justifyContent: "center", textAlign: "center" }}>
                    Write a blog
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Title" variant="outlined" type='text' required name="title" onChange={handleChange} value={write.title} />
            <TextField id="outlined-basic" label="Paste an image url from google" variant="outlined" type='text' required name="image" onChange={handleChange} value={write.image} />
            <TextField id="outlined-basic" label="Content" variant="outlined" type='text' required name="content" rows={5} multiline onChange={handleChange} value={write.content} />
            <Button variant='contained' sx={{
                backgroundColor: "darkBlue", '&:hover': {
                    backgroundColor: '#202120',
                },
            }} onClick={handleSubmit}>Post</Button>
        </Card>
    );
}

export default CreatePost;
