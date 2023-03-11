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
    const publicFolder = `${process.env.API_URL}/images/`;

    useEffect(() => {
      const getPost = async () => {
        const res = await axios.get(`${process.env.API_URL}/posts/` + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      }
      getPost();
    }, [path]);
    
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.API_URL}/posts/` + path, {
                data: {username: user.username}
            });
            navigate("/");
        } catch (error) {
            
        };        
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`${process.env.API_URL}/posts/` + path, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (error) {
            
        };        
    }
 
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img src={publicFolder + post.photo} alt="" className="singlePostImg" />}
                {updateMode ? 
                    <input className="singlePostTitleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus /> 
                : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username &&
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-regular fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-regular fa-trash-alt" onClick={handleDelete} ></i>
                            </div>                    
                        }
                    </h1>
                )}              
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Auteur:                    
                        <Link className='link' to={`/?user=${post.username}`}>
                            <b>{post.username}</b> 
                        </Link>                   
                    </span>
                    <span className='singlePostDate'>{date}</span>
                </div>
                {updateMode ? (
                    <>
                        <textarea className="singlePostDescriptionInput" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <button className="singlePostButtonUpdate" onClick={handleUpdate} >Mettre à jour</button>
                        <button className="singlePostButtonCancel" onClick={() => setUpdateMode(false)} >Annuler</button>
                    </>
                ) :
                    <p className='singlePostDescription'>{desc}</p>
                }
            </div>
        </div>
    );
};
