import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Posts } from "../../components/Posts/Posts";
import { SideBar } from "../../components/SideBar/SideBar";
import { Header } from "../../components/Header/Header";
import "./Home.css";
import baseURL from '../../api/api'


export const Home = () => {

    const [posts, setPosts] = useState([])
    const { search } = useLocation();

    console.log(baseURL);

    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axios.get(`${baseURL}/api/posts`+search);
        setPosts(res.data)
      }
      fetchPosts()
    }, [search])
    
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    )
}
