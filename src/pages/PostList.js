// PostList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    sessionStorage.removeItem('is_update');
    sessionStorage.removeItem('post_id');

    useEffect(() => {
        if(post_list.length === 0){
            dispatch(postActions.getPostFB());
        }
    },[])
    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                return <Post key={p.id} {...p}/>
            })}
        </React.Fragment>
    )
}

export default PostList;

