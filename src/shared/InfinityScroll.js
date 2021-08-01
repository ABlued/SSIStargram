import React, { useEffect, useCallback } from 'react'
import _ from "lodash";
import {Spinner} from '../elements';
const InfinityScroll = (props) => {

    const { children, callNext, is_next, loading} = props;
    const _handleScroll = _.throttle(() => {
        if(loading) return;
        const {innerHeight} = window;
        const {scrollHeight} = document.body;
        // 브라우저마다 창크기가 다르므로
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 200){
            callNext();
        }
    }, 300);

    const handleScroll = useCallback(_handleScroll, [loading]);

    useEffect(() => {
        if(loading) return;
        if(is_next){
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    },[is_next, loading])
    
    return (
        <>
            {props.children}
            {is_next && (<Spinner/>)}
        </>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,     // 불러오는 도중에는 사용할 수 없게 할려는 플래그
}

export default InfinityScroll
