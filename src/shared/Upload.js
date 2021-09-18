import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../elements";
import { actionCreators as imageActions } from "../redux/modules/image";
import { storage } from "./firebase";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading)
    const fileInput = useRef();
    const [imgUrl, setImgUrl] = useState('');


    const resizeImage = (file) => {
        let img = document.createElement("img");
        let reader = new FileReader();
        console.log(img);

        reader.onload = (e) => {
            console.log(e);
            img.src = e.target.result;
            // img의 width, height을 잘 못 받아온다
            console.log(img.width, img.height);
            let canvas = document.createElement("canvas");      
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            let MAX_WIDTH = 400;
            let MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            setImgUrl(canvas.toDataURL());
            
            // document.getElementById('output').src = dataurl;
        }
        reader.readAsDataURL(file);
    }


    const selectFile = (e) => {

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        resizeImage(file);
        // reader.readAsDataURL(file);
        // reader.onloadend = () => {
            // console.log(reader.result);
        //     dispatch(imageActions.setPreview(reader.result));
        // }
    }



    const uploadFB = () => {
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    }
    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB}>업로드하기</Button>
            <div style={{marginTop:'50px'}}>
                <img src={imgUrl} id="output"/>
            </div>
        </React.Fragment>
    )
}

export default Upload;