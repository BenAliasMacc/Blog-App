import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Write.css';
import baseURL from '../../api/api';

export const Write = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };
        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file)
            newPost.photo = filename;
            try {
                await axios.post(`${baseURL}/upload`, data);
            } catch (error) {
                
            };
        };
        try {
            const res = await axios.post(`${baseURL}/api/posts`, newPost);
            console.log(res);
            navigate("/post/" + res.data._id);
        } catch (error) {
            console.log(error);
        };        
    };

    return (
        <div className='write'>
            {file && 
                <img className='writeImg' src={URL.createObjectURL(file)} alt="" />            
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor='fileInput'>
                        <i className='writeIcon fas fa-plus'></i>
                    </label>
                    <input 
                        type="file" 
                        id='fileInput' 
                        style={{display:"none"}} 
                        onChange={(e) => setFile(e.target.files[0])} 
                    />
                    <input 
                        className='writeInput' 
                        type="text" 
                        placeholder='Title' 
                        autoFocus={true} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        className='writeInput writeText' 
                        placeholder='Tell your story...' 
                        type='text' 
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
            </form>
        </div>
    )
}
