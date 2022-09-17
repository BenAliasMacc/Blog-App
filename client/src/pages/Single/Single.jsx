import { SideBar } from '../../components/SideBar/SideBar'
import { SinglePost } from '../../components/SinglePost/SinglePost'
import './Single.css'

export const Single = () => {
    return (
        <div className='single'>
            <SinglePost />
            <SideBar />
        </div>
    )
}
