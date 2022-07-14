import axios from 'axios';
import {GET_DOGS,GET_TEMPERAMENTS, GET_DOGS_BY_NAME ,GET_DETAIL,ADD_DOG, ORDER_BY_NAME, ORDER_BY_WEIGHT,FILTER_BY_TEMPERAMENTS, CLEAR_STATE} from './constRedux';

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

export function getTemperaments(){
    return async function(dispatch){
        try{
            let temperaments = await axios.get(`${URL}/temperament`);
            temperaments = await temperaments.data;
            dispatch({
                type:GET_TEMPERAMENTS,
                payload: temperaments
            })
        }
        catch(e){console.log(e)}
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

export function addDog(body){
    return async function(dispatch){
        try{
            console.log('actionDog',body)
            let bodyDog = await axios.post(`${URL}/dog`,body)
            console.log('body',bodyDog);
            if(bodyDog.status===201){
                dispatch({
                    type:ADD_DOG
                });
                alert('Raza creada exitosamente');             
            }
        }
        catch(e){alert('Hubo un error al crear tu raza')}
    }
}

export function orderByName(value){
    console.log(value);
    return{
        type: ORDER_BY_NAME,
        payload: value
    }
}

export function orderByWeight(value){
    return{
        type:ORDER_BY_WEIGHT,
        payload:value
    }
}
    
export function filterByTemperaments(value){
    return{
        type: FILTER_BY_TEMPERAMENTS,
        payload:value
    }
}

export function clearState(){
    return{
        type: CLEAR_STATE,
    }
}