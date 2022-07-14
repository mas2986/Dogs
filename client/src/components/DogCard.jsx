import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaShareAlt } from 'react-icons/fa';

import s from '../style/DogCard.module.css'


export default function DogCard({ id, name, image, weight, temperaments }) {
    return (
        <div className={s.product}>
            <div className={s.productPhoto}>
                <div className={s.photoContainer}>
                    <div className={s.photoMain}>
                        <div className={s.controls}>
                            <FaRegHeart className={s.icon}/>
                            <FaShareAlt className={s.icon}/>
                        </div>
                        <img className={s.photoMainImg} src={image} alt="image nout found"/>
                    </div>
                    <div className={s.photoAlbum}>
                    <Link to={`/detalle/${id}`} className={s.photoAlbumUl}>
                        <button className={s.buyBtn}>VER DETALLE</button>                      
                    </Link>
                </div>
            </div>
        </div>
        <div className={s.productInfo}>
            <div>
                <h1 className={s.titleH1}>{name}</h1>
                <span className={s.titleSpan}>ID: {id}</span>
            </div>
            <div className={s.price}>
                Peso {weight.length===2?<span className={s.priceSpan}>{`${weight[0]} ${weight[1]}`}</span>:"No especificado"}
            </div>          
            <div className={s.description}>
                <h3 className={s.descriptionH3}>TEMPERAMENTS</h3>
                <ul className={s.descriptionUl}>
                    {temperaments&&temperaments.map(el=><li key={el} className={s.descriptionLi}>{el}</li>)}                    
                </ul>
            </div>
            
        </div>
    </div>
    
    )
}
      /*   <>
        <div className={s.cardContainer}>
            <div className={s.thumbnail}>
                <div className={s.controls}>
                    <FaRegHeart/>
                    <FaShareAlt/>
                </div>
                <Link to={`detalle/${id}`}>
                    <img className={s.left} src={image} alt="img not found" />
                </Link> 
                <div className={s.weightContainer}>
                    <ul className={s.weightUl}>
                        <li className={s.weightLi}>
                            {s.weight}
                        </li>
                    </ul>
                </div>
            </div>
            <div className={s.rigth}>
                    <h3>{name}</h3>
                <div className={s.separator}>
                </div>
                <div className={s.description}>
                    <h3 className={s.temperaments}>TEMPERAMENTS</h3>
                    <ul className={s.temperamentsUl}>
                        {temperaments ? temperaments.map(el =>
                            <li className={s.temperamentsLi} key={el}>{el}</li>) : <li>Sin temperamentos</li>}
                    </ul>
                </div>
           
            </div>
            <Link to={`/detalle/${id}`}>
                    <button className={s.detail}>VER DETALLE</button>
                </Link>                
        </div>
        </> */
    
