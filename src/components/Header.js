import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Grid, Text, Button } from '../elements'
import { getCookie, deleteCookie } from '../shared/Cookie'
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from "../redux/configureStore"
import { apiKey } from '../shared/firebase';
import { Link } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const _seesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_seesion_key) ? true : false;
    console.log(is_session);

   

    // <Permit>
    //     <>
    //         <Grid is_flex padding="4px 16px"> 
    //             <Grid> 
    //                 <Text margin="0px" size="24px" bold>헬로</Text> 
    //             </Grid>
    //             <Grid is_flex>
    //                 <Button text="내정보"></Button>
    //                 <Button text="알림"></Button> 
    //                 <Button text="로그아웃" _onClick={() => {dispatch(userActions.logoutFB())}}></Button> 
    //             </Grid>
    //         </Grid> 
    //     </>
    // </Permit> 
    if(is_login && is_session){ 
        return ( 
            <React.Fragment> 
                <Grid is_flex padding="4px 16px"> 
                    <Grid>
                        <Text margin="0px" size="24px" bold _onClick={() => history.push('/')}>씨stargram</Text> 
                    </Grid>
                    <Grid is_flex>
                         <Button text="내정보"></Button>
                          <Button text="알림"  _onClick={()=> history.push('/notification')}></Button> 
                          <Button text="로그아웃" _onClick={() => {dispatch(userActions.logoutFB())}}></Button> 
                    </Grid>
                </Grid>
            </React.Fragment> 
        );
    } 
    return ( 
            <>
                <Grid is_flex padding="4px 16px"> 
                    <Grid> 
                        <Text margin="0px" size="24px" bold _onClick={() => history.push('/')}>씨stargram</Text> 
                    </Grid>
                    <Grid is_flex> 
                        <Button text="로그인" _onClick={() => {
                            history.push('./login');
                        }}></Button>
                        <Button text="회원가입" _onClick={() => {
                            history.push('./signup');
                        }}></Button> 
                    </Grid> 
                </Grid> 
            </>
    ) 
}


const Left = styled.div`
    float: left;
`;
const Right = styled.div`
    float: right;
`;
export default Header
