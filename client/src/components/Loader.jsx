import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Circles} from 'react-loader-spinner';
import s from '../style/Loader.module.css'

export default function Loading(){
    return(
        <div className={s.container}>
            <Circles  color="#FFFFF" height={30} width={30} />          
        </div>
    )
}