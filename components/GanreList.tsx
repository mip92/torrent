import React from 'react';
import Ganre from "./Ganre";
import s from "../styles/GanreList.module.css"

interface GanresListProps {
    ganres: Array<any>
}

const GanreList: React.FC<GanresListProps> = ({ganres}) => {
    return (
            <div className={s.root}>
                {ganres && ganres.map((g, key) => <Ganre key={key} ganre={g}/>)}
            </div>
    );
};

export default GanreList;