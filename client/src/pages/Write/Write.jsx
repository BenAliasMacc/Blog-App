import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { Await } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Write.css';

export const Write = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        };
        if(file) {
            const data = FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file)
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                
            };
        };
        try {
            const res = axios.post("/posts", newPost);
            window.location.replace("/post" + res.data.post._id);
        } catch (error) {
            
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
                    <input type="file" id='fileInput' style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />
                    <input className='writeInput' type="text" placeholder='Title' autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea className='writeInput writeText' placeholder='Tell your story...' type='text' ></textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
            </form>
        </div>
    )
}
