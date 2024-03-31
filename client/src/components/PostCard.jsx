import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "./Postcard.css";
import Action from './Action';
import { AuthContext } from '../App';

const PostCard = (props) => {
    const { user, _id, title, content, image, createdOn } = props.post;
    const { auth } = useContext(AuthContext);

    const firstName = user.name.split(' ')[0];

    // Function to convert plain text to HTML
    const convertToHTML = (text) => {
        return { __html: text };
    };

    // Slice content and filter only paragraphs
    const slicedContent = content.slice(0, 250).replace(/<(?!\/?p(?=>|\s.*>))\/?.*?>/g, '') + '...';

    return (
        <div className="post-card">
            <div className="post-image">
                <img src={image} alt={user} />
            </div>
            <div className="post-content">
                <div className="post-header">
                    <div className="post-info">
                        <div className="top">
                            <h3 className='post title'>{title}</h3>
                            {auth?._id === user._id && <Action id={_id} />}
                        </div>
                        <div className='horizontal'>
                            <p className='post date'>{moment(createdOn).fromNow()} by {firstName}</p>
                        </div>
                    </div>
                </div>
                <div className="post-body">
                    {/* Render the sliced content as plain text */}
                    <p dangerouslySetInnerHTML={convertToHTML(slicedContent)} style={{ textAlign: 'left', fontSize: "13px" }} />
                    <Link to={`/api/blog/${_id}`} className="read-more-link">
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
