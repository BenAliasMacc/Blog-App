import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../../context/Context";
import "./TopBar.css"

const TopBar = () => {

    const { user, dispatch } = useContext(Context);
    const publicFolder = "http://localhost:5000/images/";
    const [displayInput, setDisplayInput] = useState(false);

    console.log(displayInput);

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }

    const handleOpenInput = () => {
        setDisplayInput(true);
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-brands fa-square-facebook"></i>
                <i className="topIcon fa-brands fa-square-twitter"></i>
                <i className="topIcon fa-brands fa-square-pinterest"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link className="link" to="/" >ACCUEIL</Link></li>
                    <li className="topListItem"><Link className="link" to="/about" >A PROPOS</Link></li>
                    <li className="topListItem"><Link className="link" to="/contact" >CONTACTS</Link></li>
                    <li className="topListItem"><Link className="link" to="/write" >CREER UN POST</Link></li>
                    <li className="topListItem">
                        {user && <Link className="link" to="/login" onClick={handleLogout}>DECONNEXION</Link>}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ?
                    <Link to="/settings" ><img className="topImg" src={publicFolder + user.profilePic} alt="" /></Link>
                :
                    <ul className="topList">
                        <li className="topListItem"><Link className="link" to="login" >LOGIN</Link></li>
                        <li className="topListItem"><Link className="link" to="register" >REGISTER</Link></li>                        
                    </ul>
                }          
                <div className={`topSearch ${displayInput ? "show" : ""}`} >
                    <i className="topSearchIcon fa-solid fa-magnifying-glass" onClick={handleOpenInput}></i>  
                    <input className="topSearchInput" id="search" type="text" autoFocus />
                    <i className="topSearchIconClose fa fa-times-circle" onClick={() => setDisplayInput(false)} ></i>  
                </div> 
            </div>
        </div>
    )
}

export default TopBar
