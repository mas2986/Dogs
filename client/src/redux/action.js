import axios from 'axios';
import {GET_DOGS, GET_DOGS_BY_NAME ,GET_DETAIL, ORDER_BY_NAME, CLEAR_STATE,GET_LOADING} from './constRedux';

const URL = 'http://localhost:3001'

export function getDogs(){
    return async function(dispatch){
        try{            
            let allDogs = await axios.get(`${URL}/dogs`);
            console.log(allDogs);
            allDogs = allDogs.data;
            dispatch({
                type:GET_DOGS,
                payload: allDogs
            })
        }
        catch(e){console.log(e)};
    }
}

export function getDogsByName(name){
    return async function(dispatch){
        let dogsByName = await axios.get(`${URL}/dogs?name=${name}`)
        dogsByName = dogsByName.data;
        dispatch({
            type: GET_DOGS_BY_NAME,
            payload: dogsByName
        })
    }
}

export function getDetailId(id){
    return async function(dispatch){
        try{
            let dogId = await axios.get(`${URL}/dogs/${id}`)
            dispatch({
                type:GET_DETAIL,
                payload:dogId.data
            })
        }
        catch(e){console.log(e)}
    }
}

export function orderByName(value){
    console.log(value);
    return{
        type: ORDER_BY_NAME,
        payload: value
    }
}

export function isLoading(status){
    return{
        type:GET_LOADING,
        payload: status
    }
}

export function clearState(){
    return{
        type: CLEAR_STATE,
        payload:{}
    }
}