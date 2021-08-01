import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit } = props;
  
  if(multiLine){
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
        ></ElTextarea>
      </Grid>
    );
  }
  
  return (
    <React.Fragment>
      <Grid>
        <Text margin="0px">{label}</Text>
        {
          is_submit?
          <ElInput 
            type={type}
            placeholder={placeholder} 
            onChange={_onChange} 
            value={value}
            onKeyPress={(e) => {
            if(e.key === "Enter"){
              onSubmit(e);
            }
          }}/>
          :
          <ElInput type={type} placeholder={placeholder} onChange={_onChange}/>
        }
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: "텍스트",
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  _onChange: () => {},
  onSubmit: () => {},
  is_submit: false,
  value: null,
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;


const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;