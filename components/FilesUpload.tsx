import React, {useRef} from 'react';

interface IFileUploadProps {
    setFiles: Function;
    accept: string;
    setImgs: Function;
}

const FilesUpload: React.FC<IFileUploadProps> = ({setFiles, setImgs, accept, children}) => {
    const ref = useRef<HTMLInputElement>()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // setFiles(e.target.files)
        console.log(e.target.files.length)
        /*!e.target.files ? setImgs(null) : */
        if (e.target.files.length === 4) {
            setImgs(result => [URL.createObjectURL(e.target.files[0])])
            setImgs(result => [...result, URL.createObjectURL(e.target.files[1])])
            setImgs(result => [...result, URL.createObjectURL(e.target.files[2])])
            setImgs(result => [...result, URL.createObjectURL(e.target.files[3])])
            setFiles(result => [e.target.files[0]])
            setFiles(result => [...result, e.target.files[1]])
            setFiles(result => [...result, e.target.files[2]])
            setFiles(result => [...result, e.target.files[3]])
        } else {
            setImgs([null]), setFiles([null])
        }
    }


    return (
        <div onClick={() => ref.current.click()}>
            <input
                type='file'
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
                multiple={true}
            />
            {children}
        </div>
    );
};

export default FilesUpload;