import React, {useEffect} from 'react';
import {getDetailId,clearState} from '../redux/action';
import {useDispatch,useSelector} from 'react-redux';
import s from '../style/Detalle.module.css';

export default function Detalle(props){
    const dispatch = useDispatch();
    const detail = useSelector(state=>state.dogDetail);
    

    useEffect(()=>{
        const {id} = props.match.params;
        if(id){
            dispatch(getDetailId(id))
        }
        return ()=> {dispatch(clearState())};
    },[dispatch])
    return(
        <div className={s.container}>
            <img className={s.image} src={detail.image} alt="Img not found"/>
            <h3>{detail.name}</h3>
            <h4>{detail.weight}</h4>
            <h4>{detail.height}</h4>
            <h4>{detail.lifeSpan}</h4>
            {detail.temperament&&detail.temperament.map((e,i)=>
                <p key={i}><strong>{e}</strong></p>)} 
        </div>
    )
}