import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image"
export const history = createBrowserHistory();

// rootReducer 만들기
const rootReducer = combineReducers({
    user: User,
    post: Post,
    image: Image,
    router: connectRouter(history),
});

//미들웨어 준비
const middlewares = [thunk.withExtraArgument({history:history})];        // 사용하고 싶은 미들웨어를 이 배열안에 넣어줘야한다.  //withExtraArgument에다 history를 넣어주면 reducer로 가기전에 history를 사용할 수 있다.

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...) 내가 어느 환경에 있는지 알려주는 것이다.
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");       // 왜 굳이 import 가 아닌 require를 썻는가? 이 모듈은 dev환경에서만 쓰이고 build(배포)환경에선 쓰이지 않기 때문이다. 굳이 import해서 프로그램 용량을 차지하면 낭비이다.
  middlewares.push(logger);
}
// redux devTools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__         // 지금 돌아가는 환경이 브라우져가 아니면 window라는 객체가 없다. 브라우져일때만 실행되게 한후
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({                                 // 리덕스 데브툴즈를 실행한다.
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
: compose;
// 미들웨어 묶기
const enhancer = composeEnhancers(          // 우리에게 사용하는 미들웨어를 묶어준다.
    applyMiddleware(...middlewares)
);
// 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();