import React, {useEffect} from 'react';
import {getDetailId,isLoading,clearState} from '../redux/action';
import {useDispatch,useSelector} from 'react-redux';
import Loader from './Loader';
import s from '../style/Detalle.module.css';

export default function Detalle(props){
    const dispatch = useDispatch();
    const {name,weight,height,lifeSpan,temperaments,image} = useSelector(state=>state.dogDetail);
    const loading = useSelector(state=>state.loading);
    

    useEffect(()=>{
        const {id} = props.match.params;
        if(id){
            dispatch(getDetailId(id))
        }        
        return ()=> {dispatch(clearState())};
    },[dispatch]);

    if(loading) return(<Loader className={s.container}/>)
    return(
        <div className={s.container}>
            <img className={s.image} src={image} alt="Img not found"/>
            <h3>{name}</h3>
            {weight?.length===2?<h4>{`${weight[0]} ${weight[1]}`}</h4>:"No especificado"}
            {height?.length===2?<h4>{`${height[0]} ${height[1]}`}</h4>:"No especificado"}
            {lifeSpan?.length===2?<h4>{`${lifeSpan[0]} ${lifeSpan[1]}`}</h4>:"No especificado"}
            {temperaments?temperaments.map((e,i)=>
                <h5 key={i}><strong>{e}</strong></h5>):<h5>Sin temperamentos</h5>} 
        </div>
    )
}