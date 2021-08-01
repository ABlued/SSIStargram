import React, { useState, useCallback } from 'react'
import _ from "lodash"
const Search = () => {

    const debounce = _.debounce((e) => {console.log("debounce ::: ", e.target.value);}, 1000);
    // const throttle = _.throttle((e) => {console.log("throttle ::: ", e.target.value);}, 1000);
    const [text, setText] = useState('');
    const keyPress = useCallback(debounce, []);     // 두번째인자가 변하면 함수도 변한다는 뜻이다.
    // 그래서 usecallback으로 메모이제이션이 일어나게한다.
    // 컴포넌트가 초기화한다해도 이 함수는 초기화하지마라
    const onChange = (e) => {
        setText(e.target.value);
        // console.log(e.target.value);
        keyPress(e);
        // debounce(e);
        // 함수형 컴포넌트이므로 리랜더링 일어날때마다 초기화가 된다.
        // 그래서 debounce가 일어난다.
    }
    return (
        <div>
                <input type="text" onChange={onChange}/>
        </div>
    )
}

export default Search
