import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./Postcard.css";
import Action from './Action';
import { AuthContext } from '../App';
const PostCard = (props) => {
    const { user, _id, title, content, image, createdOn } = props.post;
    const avatarContent = user.name.split(' ')[0].toLowerCase();
    const { auth } = useContext(AuthContext);

    return (
        <div className="post-card">
            <div className="post-image">
                <img src={image} alt={user} />
            </div>
            <div className="post-content">
                <div className="post-header">
                    <div className="post-info">
                    <div className="top">
                        <h3 className='post title'>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</h3>
                    {auth?._id === user._id && <Action id={_id} />}
                        </div>
                        <div className='horizontal'>
                            <p className='post date'>{moment(createdOn).fromNow()}</p>
                            <p className='post avatarContent'>By : {avatarContent}</p>
                        </div>
                    </div>
                </div>
                <div className="post-body">
                    <p>
                        <strong>{user.name}</strong>: {content.length > 50 ? `${content.slice(0, 50)}...` : content}
                    </p>
                    <Link to={`/api/blog/${_id}`} className="read-more-link">
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
