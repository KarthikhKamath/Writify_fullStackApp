import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom'; 
import "./BlogPage.css";
import Action from "../components/Action";
import { AuthContext } from '../App';

const BlogPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://mern-stack-blogger.onrender.com/api/blog/${id}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const { user, title, content, image, createdOn } = post;

    return (
        <div className="blog-page">
            <div className="blog-header">
                <h1 className="blog-title">{title}</h1>
                <p className="blog-date">{moment(createdOn).format('MMMM D, YYYY')}</p>
                <p className="blog-author">By: {user.name}</p>
                {auth?._id === user._id && <Action id={id} />}
            </div>
            <div className="blog-image">
                <img src={image} alt={user.name} />
            </div>
            <div className="blog-content">
                <p className='content-blog'>{content}</p>
            </div>
        </div>
    );
};

export default BlogPage;
