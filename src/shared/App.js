import './App.css';
import React, { useEffect } from "react";

import {BrowserRouter, Route} from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router'
import {history} from '../redux/configureStore'
import { useDispatch } from 'react-redux';

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostDetail from '../pages/PostDetail';
import PostWrite from '../pages/PostWrite';


import Header from "../components/Header";
import {Grid, Button} from "../elements";
import Permit from './permit';

import { actionCreators as userActions } from '../redux/modules/user';
import { apiKey } from "./firebase";
function App(props) {
  const dispatch = useDispatch();
  
  const _seesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_seesion_key) ? true : false;
  useEffect(() => {
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, [])
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/post/:id" exact component={PostDetail}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+"/>
      </Permit>
    </React.Fragment>
  );
}

export default App;
