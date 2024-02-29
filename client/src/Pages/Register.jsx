import { useState } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [user, setUser] = useState({name:"", email:"", password:""})
  const navigator = useNavigate()

  const handleChange=(e)=>{
    const name = e.target.name;
    const value = e.target.value
    setUser({...user,[name]:value})
  }
  const handleSubmit= async()=>{
    const res = await fetch("https://mern-stack-blogger.onrender.com/api/user/register", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    const data = await res.json()
    if(res.ok){
      navigator("/login")
    }else{
    }
  }
  return (
    <Card sx={{ mt: 4, maxWidth: "500px", margin: "50px auto", padding: 4, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)" }} elevation={3}>
      <CardContent sx={{}}>
        <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: "poppins", justifyContent: "center", textAlign: "center" }}>
          Register
        </Typography>
      </CardContent>
      <TextField id="outlined-basic" label="Name" variant="outlined" type='text' name="name" required onChange={handleChange} value={user.name} />
      <TextField id="outlined-basic" label="Email" variant="outlined" type='email' name="email" required onChange={handleChange} value={user.email} />
      <TextField id="outlined-basic" label="Password" variant="outlined" type='password' name="password" required onChange={handleChange}value={user.password} />
      <Button sx={{
        backgroundColor: "darkBlue", '&:hover': {
          backgroundColor: '#202120',
        },
      }} variant='contained' onClick={handleSubmit}>Register</Button>
    </Card>
  )
}

export default Login