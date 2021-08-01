import React from "react";
import Post from "../components/Post";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import InfinityScroll from '../shared/InfinityScroll'
import { firestore } from "../shared/firebase";

import { Grid, LikedButton } from '../elements';

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);
    const { history } = props;
    React.useEffect(() => {
        if(post_list.length < 2){
            dispatch(postActions.getPostFB());
        }
    }, [user_info]);

    return (
        <React.Fragment>
            <Grid bg={"#EFF6FF"} padding='20px 0px 0px 0px '>
            <InfinityScroll
                callNext={() => dispatch(postActions.getPostFB(paging.next))}
                is_next={paging.next? true : false}
                loading={is_loading}
            >
                {post_list.map((p, idx) => {
                    if(user_info && p.user_info.user_id === user_info.uid){
                        return (
                            <>
                            <div key={p.id}>
                                <Grid _onClick={() => {history.push(`/post/${p.id}`)}}>
                                    <Post {...p} is_me/>   
                                </Grid>
                                <Grid padding="16px">
                                    <span style={{fontWeight:'bold', marginRight:'5px'}}>좋아요 {p.liked_cnt}개</span>
                                    <span style={{fontWeight:'bold', marginRight:'5px'}}>댓글 {p.comment_cnt}개</span>
                                    {
                                        user_info && <LikedButton post_id={p.id} idx={idx}/>
                                    }
                                </Grid>
                            </div>
                            </>
                        )
                    }
                    return (
                        <>
                            <div key={p.id}>
                                <Grid  _onClick={() => {history.push(`/post/${p.id}`)}}>
                                    <Post {...p} />
                                </Grid>
                                <Grid padding="16px">
                                    <span style={{fontWeight:'bold', marginRight:'5px'}}>좋아요 {p.liked_cnt}개</span>
                                    <span style={{fontWeight:'bold', marginRight:'5px'}}>댓글 {p.comment_cnt}개</span>
                                    {
                                        user_info && <LikedButton post_id={p.id} idx={idx}/>
                                    }
                                </Grid>
                            </div>
                        </>
                    )
                })}
                {/* <button onClick={() => dispatch(postActions.getPostFB(paging.next))}>추가로드</button> */}
            </InfinityScroll>
            </Grid>
        </React.Fragment>
    )
}

export default PostList;