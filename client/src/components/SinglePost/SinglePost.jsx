import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import './SinglePost.css'

export const SinglePost = () => {

    const location = useParams();
    const path = location.postId;
    const [post, setPost] = useState({})
    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(post.createdAt).toLocaleDateString(undefined, optionsDate).split("")[0].toUpperCase() + new Date(post.createdAt).toLocaleDateString(undefined, optionsDate).slice(1);

    useEffect(() => {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
      }
      getPost()
    }, [path])
    

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img src={post.photo} alt="" className="singlePostImg" />}                
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-regular fa-edit"></i>
                        <i className="singlePostIcon fa-regular fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Autor:                    
                        <Link className='link' to={`/?user=${post.username}`}>
                            <b>{post.username}</b> 
                        </Link>                   
                    </span>
                    <span className='singlePostDate'>{date}</span>
                </div>
                <p className='singlePostDescription'>{post.desc}</p>
            </div>
        </div>
    )
}
