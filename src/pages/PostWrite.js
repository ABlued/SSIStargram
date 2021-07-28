import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Grid, Text, Button, Image, Input} from "../elements";
import Upload from "../shared/Upload";
import { actionCreators as postActions} from "../redux/modules/post";
import { actionCreators as imageActions} from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);
  const list = useSelector(state => state.post.list);
  const { history } = props;

  const [contents, setContents] = useState("");
  const is_update = sessionStorage.getItem('is_update');
  const post_id = sessionStorage.getItem('post_id');
  
  useEffect(() => {
    if(is_update){
      dispatch(postActions.readyUpdatePage(post_id));
      for(let i = 0; i < list.length; i++){
        if(list[i].id === post_id){
          setContents(list[i].contents);
          break;
        }
      }
    }
  }, [])

  const changeContents = (e) => {
    setContents(e.target.value);
  }
  const addPost = () => {
    if(is_update){
      dispatch(postActions.updatePostFB(post_id, contents));
    } else {
      dispatch(postActions.addPostFB(contents));
    }
  }
  if(!is_login){
    return(
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>앗! 잠깐!</Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button _onClick={() => {history.replace("/")}}>로그인 하러가기</Button>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          게시글 작성
        </Text>
        <Upload/>
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>

        <Image shape="rectangle" src={preview? preview : 'data:image/png;base64,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'}/>
      </Grid>

      <Grid padding="16px">
        <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
      </Grid>

      <Grid padding="16px">
        <Button text="게시글 작성" _onClick={addPost}></Button>
      </Grid>
    </React.Fragment>
  );
}

export default PostWrite;