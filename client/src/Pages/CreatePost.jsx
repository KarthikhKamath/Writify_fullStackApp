import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { toast } from 'react-toastify';
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

function CreatePost() {
    const [write, setWrite] = useState({ title: "", image: "", content: "" });

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['image'],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    const navigator = useNavigate()
    const handleChange = (name, value) => {
        setWrite({ ...write, [name]: value });
    };

    // For traditional inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    // For ReactQuill
    const handleQuillChange = (content) => {
        handleChange("content", content);
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
        const res = await fetch("https://vercel-backend-writify.vercel.app/api/blog/create", {
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
            toast.success("Blog created");
            setWrite({ title: "", image: "", content: "" });
        } else {
            toast.error("Blog couldn't be created")
            console.log(data);
        }
        navigator("/")
    }, [write]);

    return (
        <Card sx={{
            mt: 4, maxWidth: "500px", margin: "50px auto", padding: 4, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)", border: "2px solid darkBlue", '@media screen and (min-width: 700px)': {
                maxWidth: "90%", // Adjust the width for screens wider than 700px
            }
        }} elevation={3}> <CardContent sx={{}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: "poppins", fontWeight: "600", justifyContent: "center", textAlign: "center" }}>
                    Write a blog
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Title" variant="outlined" type='text' required name="title" onChange={handleInputChange} value={write.title} />
            <TextField id="outlined-basic" label="Paste an image url from google" variant="outlined" type='text' required name="image" onChange={handleInputChange} value={write.image} />
            <ReactQuill name="content" formats={formats} onChange={handleQuillChange} modules={modules} value={write.content} />

            <Button variant='contained' sx={{
                backgroundColor: "white", color: "darkblue", border: "2px solid darkBlue", margin: "auto", minWidth: "100px", '&:hover': {
                    backgroundColor: "white"
                },
            }} onClick={handleSubmit}>Post</Button>
        </Card>
    );
}

export default CreatePost;
