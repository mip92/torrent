import s from "../../styles/CreateTorrent.module.css";
import {Button, Card, List, TextField, Typography} from "@material-ui/core";
import FileUpload from "../FileUpload";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CropOriginalOutlinedIcon from "@material-ui/icons/CropOriginalOutlined";
import FilesUpload from "../FilesUpload";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {reducerForm, reducerGanres} from "../../store/actions-creators/createTorrentAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const CreateTorrentFirstStep = () => {
    const dispatch = useDispatch()
    const [name, changeTorrentName] = useState('')
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeTorrentName(e.target.value)
    }
    const [description, changeTorrentDescription] = useState('')
    const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeTorrentDescription(e.target.value)
    }
    const [picture, setPicture] = useState(null)
    const [pictures, setPictures] = useState([])
    const [torrent, setTorrent] = useState(null)
    const [img, setImg] = useState(null)
    const [imgs, setImgs] = useState([''])
    useEffect(() => {
        dispatch(reducerForm({name, description,picture:pictures,torrent,mainPicture:picture}))
    }, [name, description, picture, pictures, torrent, img, imgs])
    return (
        <form className={s.wrapper}>
            <Typography variant="h6" color={'secondary'}
                        className={s.typography}>Создание торрента</Typography>
            <Card className={s.card} variant="outlined">
                <List>
                    <TextField value={name} onChange={changeName} label="Название торрента" fullWidth/>
                    <TextField value={description} onChange={changeDescription} label="Описание" fullWidth multiline
                               rows={7}/>
                </List>
            </Card>
            <Card className={s.card} variant="outlined">
                <List>
                    <FileUpload accept="torrent/*" setFile={setTorrent}>
                        <Button variant="contained"
                                color="primary"><CloudUploadOutlinedIcon/> Загрузить
                            торрент</Button>
                    </FileUpload>
                    {torrent && <div>{torrent.name}</div>}
                    {torrent && <div
                        className={torrent.size > 2097152 ? s.redSize : s.whiteSize}>{Math.round((torrent.size / 1048576) * 100) / 100 + ' Mб'}</div>}
                </List>
            </Card>
            <Card className={s.card} variant="outlined">
                <List>
                    <FileUpload accept="image/*" setFile={setPicture} setImg={setImg}>
                        <Button variant="contained"
                                color="primary"><CropOriginalOutlinedIcon/> Загрузить
                            обложку</Button>
                    </FileUpload>
                    {img && <img width={'215.92px'} src={img}/>}
                    {img && <div>{picture.name}</div>}
                    {img && <div className={picture.size > 2097152 ? s.redSize : s.whiteSize}>
                        {(Math.round((picture.size / 1048576) * 100) / 100) + ' Mб'}
                    </div>}
                </List>
            </Card>
            <Card className={s.card} variant="outlined">
                <List>
                    <FilesUpload accept="image/*" setFiles={setPictures} setImgs={setImgs}>
                        <Button variant="contained"
                                color="primary"><PhotoLibraryOutlinedIcon/> Загрузить
                            картинки</Button>
                    </FilesUpload>
                    {imgs && (imgs.length == 4) && (pictures.length == 4) && imgs.map((i, key) =>
                        <div key={key}>
                            <img width={'219.4px'} src={i}/>
                            {/*@ts-ignore*/}
                            {pictures[3] && <div>{pictures[key].name}</div>}
                            {/*@ts-ignore*/}
                            {pictures[3] && <div
                                className={pictures[key].size > 2097152 ? s.redSize : s.whiteSize}>
                                {/*@ts-ignore*/}
                                {(Math.round((pictures[key].size / 1048576) * 100) / 100) + ' Mб'}
                            </div>}
                        </div>
                    )}
                </List>
            </Card>

        </form>
    )
}
export default CreateTorrentFirstStep