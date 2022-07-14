import React from 'react';
import {useDispatch} from 'react-redux';
import {orderByName,orderByWeight} from '../redux/action'

export default function Order({setOrder,setCurrentPage}){
    const dispatch = useDispatch();

    function handleName(e){
        console.log(e.target.value);
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    return(
        <>
        <select onChange={handleName}>
            <option selected value="" hidden>Ordenar alfabéticamente</option>
            <option value="AaZ">De A a Z</option>
            <option value="ZaA">De Z a A</option>
        </select>
        <select onChange={handleWeight}>
            <option selected value="" hidden>Ordenar por peso minimo</option>
            <option value="MinMax">De menor a mayor</option>
            <option value="MaxMin">De mayor a menor</option>
        </select>
        </>
    )
}