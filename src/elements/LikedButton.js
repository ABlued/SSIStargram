import React, {useState, useEffect, memo} from 'react';
import './LikeButton.css'
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import {actionCreators as PostActions} from '../redux/modules/post';
import { useSelector, useDispatch } from 'react-redux';

const LikedButton = memo(({post_id, idx}) => {
    const dispatch = useDispatch();
    const user_id = sessionStorage.getItem("user_id");
    const post_info = useSelector((state) => state.post.list);
    const [isChecked, setIsChecked] = useState(false);
    const onClick = () => {
        if(user_id){
            if(isChecked){
                setIsChecked(false);
                dispatch(PostActions.hatedPostFB(user_id, post_id));
            } else {
                dispatch(PostActions.likedPostFB(user_id, post_id));
                setIsChecked(true);
            }
        }

    }
    useEffect(() => {
        if(user_id && post_info && post_info.length > 0){
            // console.log(post_info[idx]);
            for(let i = 0; i < post_info[idx].likedUser.length; i++){
                if(post_info[idx].likedUser[i] === user_id) setIsChecked(true);
            }
        } else {
            setIsChecked(false);
        }
    }, [])
    return(
        <>
            {isChecked ?
                <HeartFilled 
                    className="iconButton red"
                    onClick={onClick}/> :
                <HeartOutlined  
                    className="iconButton"
                    onClick={onClick}

                />}				
        </> 
    )
})

export default LikedButton;