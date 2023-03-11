import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { SideBar } from '../../components/SideBar/SideBar'
import { Context } from '../../context/Context'
import './Settings.css'

export const Settings = () => {

    const { user, dispatch } = useContext(Context);
    const path = user._id;
    const publicFolder = "http://localhost:8000/images/";
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    console.log(user.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file)
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                
            };
        };
        try {
            const res = await axios.put("/users/" + path, updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        } catch (error) {
            console.log(error);
            dispatch({type: "UPDATE_FAILURE"})
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete("/users/"+path, {
                data: {userId: user._id}
            })
            dispatch({type: "LOGOUT"})
        } catch (error) {
            console.log(error);
        };        
    };

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Mettre à jour le compte</span>
                    <button className="settingsDeleteTitle" onClick={handleDelete}>Supprimer le compte</button>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Photo de profil</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i className='settingsPPIcon far fa-user-circle'></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{display:"none"}} 
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label>Mot de passe</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type='submit'>Mettre à jour</button>
                    {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}} >Votre profil a été mis à jour</span>}
                </form>
            </div>
            <SideBar />
        </div>
    )
}
