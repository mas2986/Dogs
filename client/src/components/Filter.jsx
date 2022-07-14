import React from 'react';
import {useDispatch} from 'react-redux';
import {filterByTemperaments} from '../redux/action';

export default function Filter({setCurrentPage,temperaments}){
    const dispatch = useDispatch();

    const handleTemperaments = (e)=>{
        dispatch(filterByTemperaments(e.target.value));
        setCurrentPage(1);
    }

    return(
        <select onChange={handleTemperaments}>
            <option selected value="" hidden>Filtrar por temperamento</option>
            <option value="todos">Todos</option>
            {temperaments&&temperaments.map((el,i)=><option key={i} value={el.name}>{el.name}</option>)}
        </select>
    )
}