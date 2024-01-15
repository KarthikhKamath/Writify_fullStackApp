import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Action({id}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigator = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleUpdate = () => {
        navigator("/update/"+id)
    };

    const handleDelete =async () => {
        console.log(id, 'Delete');
        const res = await fetch("https://mern-stack-blogger.onrender.com/api/blog/delete/"+id,{
            method:"DELETE",
            headers:{
                token:localStorage.getItem("token")
            }
        })
        const data = await res.json()
        if(res.ok){
            alert("Blog deleted")
            window.location.reload()
        }
        else{
            console.log(data)
        }

    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    handleUpdate();
                }}>Update</MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                    handleDelete();
                }}>Delete</MenuItem>
            </Menu>
        </div>
    );
}