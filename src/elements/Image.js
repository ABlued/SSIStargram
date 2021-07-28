import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size, width} = props;

    const styles = {
        src: src,
        size: size,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSREtSewr5NBz-lYcocvJXRBr_nuOPSn0W20A&usqp=CAU",
  size: 36,
  width: null,
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 50px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    width: ${(props) => props.width};
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Image;