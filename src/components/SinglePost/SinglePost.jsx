import './SinglePost.css'

export const SinglePost = () => {
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                <img src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="singlePostImg" />
                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-regular fa-edit"></i>
                        <i className="singlePostIcon fa-regular fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Autor: <b>Macc</b></span>
                    <span className='singlePostDate'>1 hour ago</span>
                </div>
                <p className='singlePostDescription'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit esse eligendi explicabo fugiat. Accusantium nesciunt dicta dolorum, aliquam officia necessitatibus reiciendis placeat ratione eius soluta facere voluptatem magni tenetur commodi.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit esse eligendi explicabo fugiat. Accusantium nesciunt dicta dolorum, aliquam officia necessitatibus reiciendis placeat ratione eius soluta facere voluptatem magni tenetur commodi.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit esse eligendi explicabo fugiat. Accusantium nesciunt dicta dolorum, aliquam officia necessitatibus reiciendis placeat ratione eius soluta facere voluptatem magni tenetur commodi.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit esse eligendi explicabo fugiat. Accusantium nesciunt dicta dolorum, aliquam officia necessitatibus reiciendis placeat ratione eius soluta facere voluptatem magni tenetur commodi.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit esse eligendi explicabo fugiat. Accusantium nesciunt dicta dolorum, aliquam officia necessitatibus reiciendis placeat ratione eius soluta facere voluptatem magni tenetur commodi.
                </p>
            </div>
        </div>
    )
}
