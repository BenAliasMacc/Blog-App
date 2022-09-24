import { v4 as uuid } from 'uuid';
import { Post } from '../Post/Post'
import './Posts.css'

export const Posts = ({ posts }) => {

    return (
        <div className='posts'>
            {posts.map((post) => (
                <Post key={uuid()} post={post} />
            ))}            
        </div>
    )
}
