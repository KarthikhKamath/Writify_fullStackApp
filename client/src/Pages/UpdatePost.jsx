import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";

function UpdatePost() {
    const [blog, setBlog] = useState({ title: "", image: "", content: "" });
    const navigator = useNavigate();
    const { id } = useParams();

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch("https://vercel-backend-writify.vercel.app/api/blog/" + id, {
                    method: "GET",
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setBlog({ title: data.title, image: data.image, content: data.content });
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };
        fetchBlog();
    }, [id]);



    const handleChange = (name, value) => {
        setBlog(prevState => ({ ...prevState, [name]: value }));
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

    const handleSubmit = async () => {
        const res = await fetch("https://vercel-backend-writify.vercel.app/api/blog/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        });
        const data = await res.json();
        if (res.ok) {
            toast.success("Blog Updated");
            navigator("/");
        } else {
            toast.error("Blog couldn't be updated");
        }
    }

    return (
        <Card sx={{
            mt: 4, maxWidth: "500px", margin: "50px auto", padding: 4, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)", border: "2px solid darkBlue", '@media screen and (min-width: 700px)': {
                maxWidth: "90%", // Adjust the width for screens wider than 700px
            }
        }} elevation={3}>    <CardContent sx={{}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: "600", fontFamily: "poppins", justifyContent: "center", textAlign: "center" }}>
                    Update a blog
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Title" variant="outlined" type='text' required name="title" onChange={handleInputChange} value={blog.title} />
            <TextField id="outlined-basic" label="Image url" variant="outlined" type='text' required name="image" onChange={handleInputChange} value={blog.image} />
            {/* ReactQuill */}
            <ReactQuill modules={modules} formats={formats} name="content" onChange={handleQuillChange} value={blog.content} />

            <Button variant='contained' sx={{
                backgroundColor: "white", color: "darkblue", border: "2px solid darkBlue", margin: "auto", minWidth: "100px", '&:hover': {
                    backgroundColor: "white"
                },
            }} onClick={handleSubmit} >Post</Button>
        </Card>
    );
}

export default UpdatePost;
