import React from 'react';
import {useDispatch} from 'react-redux';
import {orderByName} from '../redux/action'

export default function Order({setOrder,setCurrentPage}){
    const dispatch = useDispatch();

    function handleChange(e){
        console.log(e.target.value);
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    return(
        <select onChange={handleChange}>
            <option selected value="" hidden>Ordenar alfabéticamente</option>
            <option value="AaZ">De A a Z</option>
            <option value="ZaA">De Z a A</option>
        </select>
    )
}