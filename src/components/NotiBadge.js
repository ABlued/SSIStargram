import React, {useState, useEffect} from "react";
import {Badge} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications'
import {realtime} from '../shared/firebase';
import { useSelector } from "react-redux";
const NotiBadge = (props) => {
    const [is_read, setIsRead] = useState(true);
    const user_id = useSelector(state => state.user.user.uid);
    useEffect(() => {
        const notiDB = realtime.ref(`noti/${user_id}`);     //realtime데이터베이스는 ref로 갖고온다.
        notiDB.on("value", (snapshot) => {      // on함수는 구독을 의미 snapshot은 바뀐 값
            //바뀌고 난 후 세세한 로직을 여기다 기술
            setIsRead(snapshot.val().read);
        });
        return () => notiDB.off();
    },[])
    const notiCheck = () => {
        const notiDB = realtime.ref(`noti/${user_id}`);     //realtime데이터베이스는 ref로 갖고온다.
        notiDB.update({read:true});
        props._onClick();
    }

    return(
        <>
            <Badge color="secondary" variant="dot" invisible={is_read} onClick={notiCheck}>
                <NotificationsIcon/>
            </Badge>
        </>
    )
}
NotiBadge.defaultProps ={
    _onClick: () => {},
}
export default NotiBadge;