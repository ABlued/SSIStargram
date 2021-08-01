import React, { useEffect } from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useSelector, useDispatch } from "react-redux";
import Permit from "../shared/Permit";
import { LikedButton } from "../elements";

import {actionCreators as postActions} from '../redux/modules/post'
const PostDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const post_list = useSelector(state => state.post.list)
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    const user_info = useSelector((state) => state.user.user);

    useEffect(() => {
        // console.log(post);
        if(post) return;
        dispatch(postActions.getOnePostFB(id));
    },[]);

    return (
        <React.Fragment>                            {/*user_info가 있을경우에만 uid에 접근한다. */}
            {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid}/>}
            <span style={{fontWeight:'bold', marginRight:'5px'}}>좋아요 {post.liked_cnt}개</span>
            <span style={{fontWeight:'bold', marginRight:'5px'}}>댓글 {post.comment_cnt}개</span>
            <Permit>
                <LikedButton post_id={post.id} idx={post_idx} />
                <CommentWrite post_id={id}/>
            </Permit>
            <CommentList post_id={id}/>
        </React.Fragment>
    )
}

export default PostDetail;