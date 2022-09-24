import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import './Post.css'

export const Post = ({ post }) => {
    
    return (
        <div className='post'>
            {post.photo && <img className='postImg' src={post.photo} alt='' />}            
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((category) => <span className="postCat">{category.name}</span>)}
                </div>
                <Link className="link" to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='postDesc'>{post.desc}</p>
        </div>
    )
}
