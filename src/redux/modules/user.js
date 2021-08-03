import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import {auth, realtime} from '../../shared/firebase';
import firebase from "firebase/app"
import { firestore } from "../../shared/firebase";


// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// const logIn = (user) => {
//     return {
//         type: LOG_IN,
//         user: user,
//     }
// }

// const logIn = createAction(LOG_IN, (user) => ({user}));
// 위와 같다

// const reducer = (state={}, action={}) => {
//     switch(action.type){
//         case "LOG_IN" : {
//             state.user = action.user;
//         }
//     }
// }

// const reducer = handleActions({
//     [LOG_IN]: (state, action) => {
//     },
// },initialState );
// 위와 같다


// action creators
const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) =>({user}));
const getUser = createAction(GET_USER, (user) =>({user}));

const initialState = {
    user: null,
    is_login: false,
};

const user_initial = {
    user_name: 'ablue',
}
// middleware actions

const loginFB = (id, pwd) => {
    return function (dispatch, getState, {history}) {
     
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)     // 로그인 지속성 체크
        .then((res) => {
            auth
            .signInWithEmailAndPassword(id, pwd)        // firebase에서 로그인 정보가 유효한지 체크
            .then((user) => {
                let imageSrc = '';
                const userDB = firestore.collection("userProfileInfo");
                // console.log(user.user.uid);
                sessionStorage.setItem("user_id",user.user.uid);
                userDB.where("id", "==", user.user.uid).get().then(docs => {
                    docs.forEach(doc => {
                        imageSrc = doc.data().src;
                        // console.log(doc.data().src);
                    })
                    dispatch(setUser({
                        user_name: user.user.displayName,
                        id: id,
                        user_profile: imageSrc,
                        uid: user.user.uid,      // 유저의 고유값
                    }));
                })
                history.push('./');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert("이메일 또는 비밀번호가 유효하지 않습니다!");
            });
        });
    }
}

const loginCheckFB = () => {
    return function (dispatch, getState, {history}){
        auth.onAuthStateChanged((user) => {     // 이 유저가 있냐없냐 확인하기
            if(user){
                const userDB = firestore.collection("userProfileInfo");
                userDB.where("id", "==", user.uid).get().then(docs => {
                    docs.forEach(doc => {
                        dispatch(setUser({
                            user_name: user.displayName,
                            user_profile: doc.data().src,
                            id: user.email,
                            uid: user.uid,
                        }))
                    })
                })
            } else {
                dispatch(logOut());
            }
        })
    }
}

const logoutFB = () => {
    return function (dispatch, getState, {history}) {
        auth.signOut().then(() => {
            dispatch(logOut());
            sessionStorage.removeItem("user_id");
            history.replace('/');       // 뒤로가기를 해도 전 페이지가 나오지 않음
        })
    }
}

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, {history}){
        const selectedIndex = Math.random()
        const profileDB = firestore.collection("profile");
        const userDB = firestore.collection("userProfileInfo");
        let profileSrc = '';
        profileDB.get().then(docs => {
            const selectedIndex = Math.floor(Math.random() * docs.size);
            let count = 0;
            docs.forEach(doc => {
                if(count === selectedIndex) {
                    profileSrc = doc.data().src;
                }
                count++;
            })
        })
        auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
            // Signed in
            // ...
            auth.currentUser.updateProfile({
                displayName: user_name,
            }).then(() => {
                dispatch(setUser({
                    user_name: user_name, 
                    id: id, 
                    user_profile: profileSrc,
                    uid: user.user.uid,      // 유저의 고유값
                }));
                userDB.add({id:user.user.uid, src:profileSrc})
                const _noti_item = realtime.ref(`noti/${user.user.uid}`);
                _noti_item.set({
                    read:true,
                })
                history.push('./');
            }).catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
}
//reducer
export default handleActions({
    [SET_USER] : (state, action) => produce(state, (draft) => {       // produce의 첫번째 인자는 원본 값, 두번째 매개변수는 동작할 행동을 적는다
        setCookie("is_login", "success");
        draft.user = action.payload.user;                           // action안에 payload안에 데이터가 들어있다.
        draft.is_login = true;
    }),
    [LOG_OUT] : (state, action) => produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER] : (state, action) => produce(state, (draft) => {

    }),
}, initialState);

// action creator export
const actionCreators = {
    logOut,
    getUser,
    signupFB,
    loginFB, 
    loginCheckFB,
    logoutFB,
};

export { actionCreators };