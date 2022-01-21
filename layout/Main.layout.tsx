import React from 'react';
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import s from "../styles/MainLayout.module.css"
import SideBar from "../components/Sidebar/SideBar";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    children: any
}

export default React.memo<MainLayoutProps>(function MainLayout
    ({
         children,
         title,
         description,
         keywords
     }) {

        return (
            <div>
                <Head>
                    <title>{title || 'Лучшие игры и программы'}</title>
                    <meta name='description' content={`Лучшая торрент площадка. ${description}`}/>
                    <meta name='robots' content='index, follow'/>
                    <meta name='keywords' content={keywords || "Торрент, игры, приложения"}/>
                    <meta name="viewport" content={'width=device-width, initial-scale=1'}/>
                </Head>
                <div className={s.wrapper}>
                    <div className={s.navbar}>
                        <Navbar/>
                    </div>
                    <div className={s.content}>
                        {children}
                    </div>
                    <div className={s.sidebar}>
                        <SideBar/>
                    </div>
                </div>
            </div>
        );
    }
)
