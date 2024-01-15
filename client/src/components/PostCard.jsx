import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Action from './Action';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../App';

export default function PostCard(props) {
    const { user, _id, title, content, image, createdOn } = props.post;
    const {auth} = useContext(AuthContext)

    // Ensure user is defined before using slice
    const avatarContent = user.name[0].toUpperCase()

    return (
        <Card sx={{ width: "100%", boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.1)", borderRadius: "20px" }} id={_id}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {avatarContent}
                    </Avatar>
                }
                action={
                    
                   auth?._id===user._id && <Action id={_id} />
                }
                title={title}
                subheader={moment(createdOn).fromNow()}
            />
            <CardMedia
                component="img"
                height="100%"
                image={image}
                alt={user}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                   {user.name} : {content}
                </Typography>
            </CardContent>
        </Card>
    );
}
