import React from 'react';
import s from '../style/Paginado.module.css'

export default function Paginado({dogs,dogsPerPage,handlePaginado}){
    const page = [];

    for(let i=1;i<=Math.ceil(dogs/dogsPerPage);i++){
        page.push(i);
    }

    return(
        <div className={s.container}>
            {page&&page.map(e=><li className={s.text} key={e}>
                <a onClick={()=>handlePaginado(e)}>{e}</a>                
            </li>            
        )}
        </div>
    )


}