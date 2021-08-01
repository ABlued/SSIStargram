import React, { useState, useEffect } from "react";
import {Grid, Text} from "../elements";
import Card from "../components/Card";
import {realtime} from '../shared/firebase';
import { useSelector } from 'react-redux';

const Notification = (props) => {

  const user = useSelector(state => state.user.user);
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    if(!user) return;
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    // realtime베이스에 데이터를 정렬하는 함수
    const _noti = notiDB.orderByChild("insert_dt");
    // 데이터를 처음 한 번만 쓸거니까 once를 쓴다
    _noti.once("value", snapshot => {
      if(snapshot.exists()){
        let _data = snapshot.val();
        let _noti_list = Object.keys(_data).reverse().map(v => {
          return _data[v];
        });
        setNoti(_noti_list);
      }
    })
  },[user]);
  
    return (
      <React.Fragment>
        <Grid padding="16px" bg="#EFF6FF">
          {noti.map((n, idx) => {
            return <Card {...n} key={`noti_${idx}`} />;
          })}
        </Grid>
      </React.Fragment>
    );
}

export default Notification;