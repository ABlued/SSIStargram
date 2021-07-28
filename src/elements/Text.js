import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, float, _onClick, padding} = props;

  const styles = {bold: bold, color: color, size: size, margin, float: float, padding: padding};
  return (
      <P {...styles} onClick={_onClick}>
          {children}
      </P>
  )
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: null,
  float: null, 
  padding: null,
  _onClick: () => {},
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}
  padding: ${props => props.padding};
`;

export default Text;
