import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function UpdatePost() {
    const [blog, setBlog] = useState({ title: "", image: "", content: "" });
    const navigator= useNavigate()
    const {id} =useParams()

    useEffect(()=>{
        const fetchBlog = async ()=>{
            const res = await fetch("https://mern-stack-blogger.onrender.com/api/blog/"+id,{
                method:"GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json();
            if (res.ok) {
                console.log("updatePage", data);
                setBlog(data);
            } else {
                console.log(data);
            }
        }
        fetchBlog()
    }, [id])
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value });
    };
    const handleSubmit = async()=>{
        console.log(blog)
        const res = await fetch("https://mern-stack-blogger.onrender.com/api/blog/update/"+id, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
    })
    const data = res.json()
    if(res.ok){
        alert("Blog Updated")
        navigator("/")
        window.location.reload()
    }
    else{
        console.log(data)
    }
}

    return (
        <Card sx={{ mt: 2, maxWidth: "500px", margin: " auto", padding: 4, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)" }} elevation={3}>
            <CardContent sx={{}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: "poppins", justifyContent: "center", textAlign: "center" }}>
                    Update a blog
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Title" variant="outlined" type='text' required name="title" onChange={handleChange} value={blog.title} />
            <TextField id="outlined-basic" label="Image url" variant="outlined" type='text' required name="image" onChange={handleChange} value={blog.image} />
            <TextField id="outlined-basic" label="Content" variant="outlined" type='text' required name="content" rows={5} multiline onChange={handleChange} value={blog.content} />
            <Button variant='contained' sx={{
                backgroundColor: "#000", '&:hover': {
                    backgroundColor: '#202120',
                },
            }} onClick={handleSubmit} >Post</Button>
        </Card>
    );
}

export default UpdatePost;
