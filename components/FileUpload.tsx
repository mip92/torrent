import React, {useRef} from 'react';

interface IFileUploadProps{
    setFile: Function;
    accept: string;
    setImg?: Function
}

const FileUpload: React.FC<IFileUploadProps> = ({
                                                    setFile,
                                                    setImg,
                                                    accept,
                                                    children}) => {
    const ref=useRef<HTMLInputElement>()
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFile(e.target.files[0])
        !e.target.files[0] ? setImg(null):
            setImg && setImg(URL.createObjectURL(e.target.files[0]))
    }


    return (
        <div onClick={()=>ref.current.click()}>
            <input
                type='file'
                accept={accept}
                style={{display:'none'}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;