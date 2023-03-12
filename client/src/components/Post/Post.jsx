import { Link } from "react-router-dom";
import './Post.css'
import baseURL from '../../api/api'

export const Post = ({ post }) => {

    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(post.createdAt).toLocaleDateString(undefined, optionsDate).split("")[0].toUpperCase() + new Date(post.createdAt).toLocaleDateString(undefined, optionsDate).slice(1);
    const publicFolder = `${baseURL}/images/`
    
    return (
        <div className='post'>
            <Link className="link" to={`/post/${post._id}`}>
                {post.photo && <img className='postImg' src={publicFolder + post.photo} alt='' />}            
                <div className="postInfo">
                    <div className="postCats">
                        {post.categories.map((category) => <span className="postCat">{category.name}</span>)}
                    </div>
                        <span className="postTitle">{post.title}</span>
                    <span className="postDate">{date}</span>
                </div>
                <p className='postDesc'>{post.desc}</p>
            </Link>
        </div>
    )
}
