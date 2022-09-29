import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import './SinglePost.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';

export const SinglePost = () => {

    const location = useParams();
    const path = location.postId;
    const navigate = useNavigate();
    const { user } = useContext(Context)
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(post.createdAt).toLocaleDateString(undefined, optionsDate).split("")[0].toUpperCase() + new Date(post.createdAt).toLocaleDateString(undefined, optionsDate).slice(1);
    const publicFolder = "localhost:5000/images/";

    useEffect(() => {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
      }
      getPost();
    }, [path]);
    
    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data: {username: user.username}
            });
            navigate("/");
        } catch (error) {
            
        };        
    }
 
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img src={publicFolder + post.photo} alt="" className="singlePostImg" />}
                {updateMode ? 
                    <input className="singlePostTitleInput" type="text" value={post.title} autoFocus /> 
                : (
                    <h1 className="singlePostTitle">
                        {post.title}
                        {post.username === user?.username &&
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-regular fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-regular fa-trash-alt" onClick={handleDelete} ></i>
                            </div>                    
                        }
                    </h1>
                )}              
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Autor:                    
                        <Link className='link' to={`/?user=${post.username}`}>
                            <b>{post.username}</b> 
                        </Link>                   
                    </span>
                    <span className='singlePostDate'>{date}</span>
                </div>
                {updateMode ?
                    <textarea className="singlePostDescriptionInput" type="text" value={post.desc} />
                :
                    <p className='singlePostDescription'>{post.desc}</p>
                }                
            </div>
        </div>
    )
}
