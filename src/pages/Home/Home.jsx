import { Posts } from "../../components/Posts/Posts"
import { SideBar } from "../../components/SideBar/SideBar"
import { Header } from "../../components/Header/Header"
import "./Home.css"

export const Home = () => {
    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                <SideBar />
            </div>
        </>
    )
}
