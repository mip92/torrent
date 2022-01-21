import React from 'react';
import {ganreType} from "../types/ganreTypes";
import s from "../styles/GanreList.module.css"
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Link, List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useRouter} from "next/router";

interface GanreListProps {
    ganre: ganreType
}

const Ganre: React.FC<GanreListProps> = ({ganre}) => {
    const router = useRouter()
    const findGanre = async () => {
        router.push(`/games?offset=${0}&limit=${10}&ganre=${ganre.id}`)
    }
    return (
        <Link onClick={()=>findGanre()}>
        <Card className={s.root} >
            <div className={s.ganre}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={`http://localhost:5000/${ganre.GanreLogo}`}
                        title={ganre.value}
                    />
                    <CardContent>
                        <Typography className={s.typography}
                                    gutterBottom variant="h6" component="h3">
                            {ganre.value}
                        </Typography>
                        {/*<Typography variant="body2" color="textSecondary" component="p">
                            {ganre.description}
                        </Typography>*/}
                    </CardContent>
                </CardActionArea>
            </div>
        </Card>
        </Link>
        /*<Card className={s.root} variant="outlined">
            <List>
                <div className={s.ganre} >
                    <Typography variant="h6" color={'secondary'} className={s.typography}>{ganre.value}</Typography>
                    <div>{<img className={s.img} src={`http://localhost:5000/${ganre.GanreLogo}`}/>}</div>
                    <Button onClick={()=>findGanre()}>asd</Button>
                </div>
            </List>
        </Card>*/
    );
};

export default Ganre;