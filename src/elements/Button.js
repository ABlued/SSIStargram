import React from "react";
import styled from "styled-components";

const Button = (props) => {

    const {text, _onClick, is_float, children, width} = props;
    if(is_float){
      return(
        <>
          <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
        </>
      )
    }

    return (
      <React.Fragment>
        <ElButton onClick={_onClick} width={width}>{text? text: children}</ElButton>
      </React.Fragment>
    );
}

Button.defaultProps = {
    text: false,
    _onClick: () => {},
    children: null,
    is_float: false,
    width:null,
}

const ElButton = styled.button`
    width: ${props => props.width ? props.width : '100%'};
    background-color: #212121;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;

`;
const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background: #212121;
  color: #ffffff;
  border:none;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  border-radius: 50px;
  vertical-align: middle;
`;
export default Button;