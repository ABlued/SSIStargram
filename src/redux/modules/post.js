import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore, storage } from '../../shared/firebase'
import moment from "moment"
import { actionCreators as imageActions } from "./image";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const SET_COMMENT = "SET_COMMENT";
const UPDATE_POST = "UPDATE_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const setComment = createAction(SET_COMMENT, (comment) => ({comment}));
const updatePost = createAction(UPDATE_POST, (value, index) => ({value, index}));
const initialState = {
    list: [],
    comment: '',
}

const initialPost = {
    id: 0,
    // user_info: {
    //     user_name: "mean0",
    //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    // },
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSREtSewr5NBz-lYcocvJXRBr_nuOPSn0W20A&usqp=CAU",
    contents: "고양이네요!",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),        //오늘 날짜가 moment객체가 format함수를 통해 string형으로 변환
}

const getPostFB = () => {
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        postDB.get().then((docs) => {
            let post_list = [];            
            docs.forEach((doc) => {

                let _post = doc.data();
                // ['comment_cnt', 'contents', ..]
                let post = Object.keys(_post).reduce((acc,cur) => {
                    if(cur.indexOf("user_") !== -1){
                        return {
                            ...acc,
                            user_info: {...acc.user_info, [cur]: _post[cur]},
                        };
                    }
                    return{...acc, [cur]: _post[cur]}       // ...이전 값,  key 값: value 값
                }, {id: doc.id, user_info: {}})

                // let _post = {
                //     id: doc.id,
                //     ...doc.data()
                // };
                // let post = {
                //     id: doc.id,
                //     user_info: {
                //         user_name: _post.user_name,
                //         user_profile: _post.user_profile,
                //         user_id: _post.user_id,
                //     },
                //     image_url: _post.image_url,
                //     contents: _post.contents,
                //     comment_cnt: _post.comment_cnt,
                //     insert_dt: _post.insert_dt,
                // }
                post_list.push(post);
            })
            console.log(post_list);
            dispatch(setPost(post_list));
        })
    }
}

const addPostFB = (contents="") => {
    return function (dispatch, getState, {history}) {
        dispatch(imageActions.setPreview(null));
        const postDB = firestore.collection("post");
        const _user = getState().user.user; // getState는 store에 있는 객체를 갖고옴
        const user_info = {
            user_name: _user.user_name,
            user_id : _user.uid,
            user_profile: _user.user_profile,
        }
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),        // add 함수가 들어왔을때 시간을 체크해야 한다.
        };
        const _image = getState().image.preview;
        // 파이어베이스 스토리지에 업로드하기
        const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url");
        _upload.then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                // console.log(url);       // 업로드 링크 받아오기
                dispatch(imageActions.uploadImage(url));
                return url;
            }).then(url => {        //DB에 저장하기

                postDB.add({...user_info, ..._post, image_url: url})
                .then((doc) => {
                    postDB.doc(doc.id).update({id:doc.id});
                    let post = {user_info, ..._post, id:doc.id, image_url: url};
                    dispatch(addPost(post));
                    history.replace('/');
                }).catch((err) => {
                        window.alert("post 작성에 실패했습니다");
                        console.log("post 작성에 실패했습니다.", err);
                    });
            }).catch((err) => {
                window.alert("이미지 업로드에 문제가 있다.");
                console.log("이미지 업로드에 문제가 있다." , err);
            })
        });
    }
}

const readyUpdatePage =  (post_id) => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");
        postDB.doc(post_id).get().then((doc) => {
            dispatch(imageActions.setPreview(doc.data().image_url));
            dispatch(setComment(doc.data().contents));
        });

    }
}

const updatePostFB = (post_id, content="" ) => {
    return function (dispatch, getState, {history}){   
        const postDB = firestore.collection("post");
        const _user = getState().user.user; // getState는 store에 있는 객체를 갖고옴
        const _image = getState().image.preview;
        // 파이어베이스 스토리지에 업로드하기
        const _upload = storage.ref(`images/${ _user.uid}_${new Date().getTime()}`).putString(_image, "data_url");
        _upload.then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                // console.log(url);       // 업로드 링크 받아오기
                dispatch(imageActions.uploadImage(url));
                return url;
            }).then(url => {
                postDB.doc(post_id).update({
                    contents: content,
                    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
                    image_url: url,
                }).then(() => {

                    postDB.doc(post_id).get().then((doc) => {
                        const _list = getState().post.list; // getState는 store에 있는 객체를 갖고옴
                        _list.map((v,i) => {
                            if(v.id === post_id){
                                const data = doc.data();
                                const copyObject = {
                                    id: doc.id,
                                    user_info:{
                                        user_profile: data.user_profile,
                                        user_name: data.user_name,
                                        user_id: data.user_id,
                                    },
                                    contents: `${data.contents}`,
                                    comment_cnt: data.comment_cnt,
                                    image_url: data.image_url,
                                    insert_dt: data.insert_dt,
                                }
                                dispatch(updatePost(copyObject,i));
                            }
                        })
                        history.replace('/');
                    })
                })
            })
        })
    }
}

export default handleActions(
    {
        [SET_POST] : (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
        [ADD_POST] : (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);        // 최신 게시물은 위에 올려야 하니 push가 아닌 unshift를 쓰는 것이다.
        }),
        [SET_COMMENT] : (state, action) => produce(state, (draft) => {
            draft.comment = action.payload.comment;
        }),
        [UPDATE_POST] : (state, action) => produce(state, (draft) => {
            draft.list[action.payload.index] = action.payload.value;
        }),

    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    updatePostFB,
    readyUpdatePage,
}

export {actionCreators}