import React from 'react';
import {Link} from 'react-router-dom';
import s from '../style/DogCard.module.css'


export default function DogCard({id,name,image,weight}){
    return(
        <div className={s.cardContainer}>
            <img className={s.size} src={image} alt="img not found"/>
            <div className={s.nameContainer}>
                <Link to={`detalle/${id}`} className={s.link}>
                    <h4>{name}</h4>
                </Link>
                    <h5>{weight}</h5>
            </div>
            <div className={s.iconContainer}>
                <img className={s.icon} src='https://neurona-ba.com/wp-content/uploads/2021/07/HenryLogo.jpg' alt=""/>
                <img className={s.icon} src='https://cdn-icons-png.flaticon.com/512/109/109577.png' alt=""/>
                <img className={s.icon} src="https://w7.pngwing.com/pngs/482/306/png-transparent-computer-icons-android-share-icon-sharing-share-sharing-share-icon-plugin-thumbnail.png" alt=""/>
            </div>
        </div>
    )
}