import { useEffect, useState } from 'react';
import axios from "axios";
import { v4 as uuid } from "uuid";
import './SideBar.css';
import { Link } from 'react-router-dom';

export const SideBar = () => {

    const [cats, setCats] = useState([])

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        }
        getCats();
    }, [])
    

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="sidebarImg"src="https://images.freeimages.com/images/large-previews/e04/yellow-frontal-with-ivy-1228121.jpg" alt='' />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt animi praesentium quos ex corrupti, ad velit aliquid aperiam</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((cat) => (
                        <li key={uuid()} className="sidebarListItem">
                            <Link className='link' to={`/?cat=${cat.name}`}>{cat.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}
