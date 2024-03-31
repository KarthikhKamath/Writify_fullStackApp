import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, useMediaQuery } from '@mui/material'
import { Logout, Menu as MenuIcon } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../App.js';

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {auth, setAuth} = useContext(AuthContext)
    const {refresh, setRefresh } = useContext(AuthContext)
    const navigator = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const isNonMobileDevice = useMediaQuery("(min-width:1000px)")
    useEffect(() => {
        
        const fetchUser = async () => {
            
            try {
                // Check if the user is not authenticated before making the fetch request
                
                if (auth===null) {
                    const res = await fetch("https://vercel-backend-writify.vercel.app/api/user/auth", {
                        method: "GET",
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setAuth(data);
                        setRefresh(!refresh)
                    } else {
                        setAuth(null);
                    }
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchUser();
    }, [auth, refresh]); // Only run when auth changes

    const logOut =async () => {
         localStorage.removeItem("token")
        navigator("/")
        window.location.reload()
    }

    return (
        <AppBar sx={{ p: "0 10%", backgroundColor: "darkBlue" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link style={{ color: "#fff", textDecoration: "none" }} to={"/"}>Writify</Link>
                {/* <h4>Writify</h4> */}

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {isNonMobileDevice ?
                        <>
                        {auth?
                                <>
                            <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/"}>Home</Link></Button>
                            <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/create"}>Create</Link></Button>
                            <Button style={{ color: "#fff", textDecoration: "none" }} onClick={logOut}>Logout</Button>
                                </>
                        :<>
                            <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/login"}>Login</Link></Button>
                            <Button><Link style={{ color: "#fff", textDecoration: "none" }} to={"/register"}>Register</Link></Button>
                                </>
                        }
                        </>
                        :
                        <><IconButton
                            sx={{ color: "#fff" }}
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <MenuIcon />
                        </IconButton>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                
                            >
                            {auth?
                            <>
                                <MenuItem onClick={handleClose}><Link style={{ color: "#000", textDecoration: "none" }} to={"/"}>Home</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link style={{ color: "#000", textDecoration: "none" }} to={"/create"}>Create</Link></MenuItem>
                                <MenuItem style={{ color: "#000", textDecoration: "none" }} onClick={()=>{handleClose(); logOut()}}>Logout</MenuItem>
                                    </>
                                    : <>
                                <MenuItem onClick={handleClose}><Link style={{ color: "#000", textDecoration: "none" }} to={"/login"}>Login</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link style={{ color: "#000", textDecoration: "none" }} to={"/register"}>Register</Link></MenuItem>

                                    </>
                            }
                            </Menu>
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar