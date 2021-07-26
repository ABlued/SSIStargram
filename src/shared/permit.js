import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
    const user_info = useSelector(state => state.user.user);
    const _seesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_seesion_key) ? true : false;
    if(is_session && user_info){
        return(
            <>
                {props.children}
            </>
        )
    }
    return null;
}

export default Permit;