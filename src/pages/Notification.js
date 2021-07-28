import React from 'react'
import { useSelector } from "react-redux";
import {Grid, Text, Button, Image} from "../elements";
import { history } from "../redux/configureStore"

const NotificationCard = (props) => {
    return(
      <Grid is_flex padding="16px" bg="white" margin="10px">
        <Image shape="rectangle" src={props.image_url} width="50px"/>
        <Text padding="16px"><span style={{fontWeight:'bold'}}>{props.user_name}</span>님이 게시글에 댓글을 남겼습니다 :)!</Text>
      </Grid>

    )
}


const Notification = () => {
  const is_login = useSelector(state => state.user.is_login);

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
        <Grid padding="16px" is_flex bg="rgba(240, 246, 254, 1)" flex_direction="column">
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
          <NotificationCard/>
        </Grid>
    )
}
NotificationCard.defaultProps = {
  user_name: "ablue",
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
};

export default Notification
