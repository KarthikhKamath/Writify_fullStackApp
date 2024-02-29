import {React, useContext, useEffect, useState} from 'react'
import { Button, Card, CardContent, MenuItem, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

function Login() {
    const [user, setUser] = useState({  email: "", password: "" })
    const navigator = useNavigate()
    const {refresh, setRefresh} = useContext(AuthContext)
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

       

    const handleSubmit = async () => {
        console.log(user)
        const res = await fetch("https://mern-stack-blogger.onrender.com/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if (res.ok) {
            localStorage.setItem("token", data.token)
            // console.log("Logged in")
            // console.log("login",refresh)
            setRefresh(true)
            // console.log("login", refresh)
            navigator("/")
        } else {
            alert("User does not exist")
            console.log(data)
        }
    }
    return (
        <Card sx={{
            mt: 4, maxWidth: "500px", margin: "50px auto", padding: 4, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)" }} elevation={3}>
            <CardContent sx={{}}>
                <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: "poppins", justifyContent: "center", textAlign: "center" }}>
                    Login
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="Email" variant="outlined" type='email' required name="email" onChange={handleChange} value={user.email}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' required name="password" onChange={handleChange} value={user.password} />
            <Button sx={{
                backgroundColor: "darkBlue", '&:hover': {
                    backgroundColor: '#202120',
                },
            }}type='submit' variant='contained' onClick={handleSubmit}>Login</Button>
            <MenuItem><Link style={{ color: "#000", textDecoration: "none", margin:"auto"}} to={"/register"}>Register</Link></MenuItem>
        </Card>
    )
}

export default Login