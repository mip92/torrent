import React, {useEffect, useState} from 'react';
import s from "../../styles/Paginator.module.css"
import {Button, Card, CardActionArea, Typography} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useRouter} from "next/router";
import {fetchLogo} from "../../store/actions-creators/ganreAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface Query {
    offset: number,
    limit: number,
    ganre: number
}

interface PaginationRounded {
    fullLength: number,
    query: Query,
}

export default function Pagination ({fullLength, query}) {
    let router = useRouter()
    const {torrents}=useTypedSelector(state=>state.torrent)
    let [offset, SetOffset] = useState(query.offset)
    let [limit, SetLimit] = useState(query.limit)
    let [allPages, setAllPage] = useState(Math.ceil(fullLength / limit))
    let [ganre, setGanre] = useState(Number(query.ganre))
    let [currentPage, setCurrentPage] = useState(offset / limit + 1)
    let prevPage = () => {
        SetOffset(Number(offset) - Number(limit))
    }
    let nextPage = () => {
        SetOffset(Number(offset) + Number(limit))
    }///////////////////////////////////////////////
    useEffect( () => {
        setCurrentPage(offset / limit + 1)
        router.push('http://localhost:3000' + `${router.pathname}?offset=${offset}&limit=${limit}&ganre=${ganre}`)
    }, [ganre,offset])
    useEffect(() => {
        SetLimit(query.limit)
        setAllPage(Math.ceil(fullLength / limit))
        setGanre(Number(query.ganre))
        SetOffset(query.offset)
    }, [query])


    return (

        <div style={{display: 'flex', justifyContent: 'center'}}>

            <Card style={{width: "25px"}} onClick={offset > 0 ? prevPage : () => {
            }}>
                <CardActionArea>
                    <div className={s.card}>
                        <div className={s.value}>
                            {currentPage == 1 ?
                                <ArrowBackIosIcon fontSize='small' style={{color: 'LightGrey'}}/>
                                : <ArrowBackIosIcon fontSize='small'/>
                            }
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            {currentPage !== 1 && <Card style={{width: "25px"}} onClick={() => SetOffset(0)}>
                <CardActionArea>
                    <div className={s.card}>
                        <div className={s.value}>
                            1
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            }
            {currentPage !== 1 && currentPage !== 2 &&
            <Card style={{width: "25px"}} onClick={() => prevPage()}>
                <CardActionArea>
                    <div className={s.card}>
                        <div className={s.value}>
                            <Typography>
                                {currentPage - 1}
                            </Typography>
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            }
            <Card style={{width: "25px"}}>
                <CardActionArea>
                    <div className={s.currentCard}>
                        <div className={s.value}>
                            <Typography>
                                {currentPage}
                            </Typography>
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            {currentPage !== allPages - 1 && currentPage !== allPages &&
            <Card style={{width: "25px"}} onClick={() => nextPage()}>
                <CardActionArea>
                    <div className={s.card}>
                        <div className={s.value}>
                            <Typography>
                                {currentPage + 1}
                            </Typography>
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            }
            {currentPage !== allPages &&
            <Card style={{width: "25px"}} onClick={() => SetOffset((Math.floor(fullLength / limit) * limit))}>
                <CardActionArea>
                    <div className={s.card}>
                        <div className={s.value}>
                            {allPages}
                        </div>
                    </div>
                </CardActionArea>
            </Card>
            }
            <Card style={{width: "25px"}} onClick={currentPage < allPages ? nextPage : () => {
            }}>
                <CardActionArea>
                    <div className={s.card}>
                        <div className={s.value}>
                            {currentPage == allPages ?
                                <ArrowForwardIosIcon fontSize='small' style={{color: 'LightGrey'}}/>
                                : <ArrowForwardIosIcon fontSize='small'/>
                            }
                        </div>
                    </div>
                </CardActionArea>
            </Card>
        </div>
    );
}

