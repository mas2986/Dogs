import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import DogCard from './DogCard';
import Order from './Order';
import Filter from './Filter';
import Paginado from './Paginado';
import Loader from './Loader';
import { getDogs,getTemperaments, getDogsByName,clearState } from '../redux/action';
import s from '../style/Home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);  
    const dogsName = useSelector(state=>state.dogsName);
    const loading = useSelector(state=>state.loading);
    const temperaments = useSelector(state=>state.temperaments);

    let location = useLocation();
    

    const [dogsPerPage, setDogsPerPage] = useState(8);
    const [currentPage,setCurrentPage] = useState(1);
    const indexLastDog = currentPage*dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexFirstDog,indexLastDog);

    const [order,setOrder] = useState('');
    useEffect(() => {
        dispatch(getTemperaments());
        if(location.pathname === '/search') {
            dispatch(getDogsByName(location.search.split('=')[1]));
        }
        else{
            dispatch(getDogs())
        }     
        return ()=>{dispatch(clearState())}
    }, [dispatch,location.search.split('=')[1]])
    //Otra solución para evitar los re renderizados podría ser generar un estado global en reducer
    //cuyos valores TRUE o FALSE se modifiquen desde el componente NavBar y
    //en el componente Home se coloque como dependencia en useEffect ese estado

    const handlePaginado = (number)=>{
        setCurrentPage(number);
    }

    if(loading) return(<Loader className={s.container}/>)
    if(location.pathname === '/search'){
        return(            
            <div className={s.container}>
                {dogsName&&<h3>{dogsName.length} resultados para tu búsqueda </h3>}
                {dogsName&&dogsName.map(dog=>(
                    <DogCard
                        key={dog.id}
                        image={dog.image}
                        id={dog.id}
                        name={dog.name}
                        weight={dog.weight}
                        temperaments={dog.temperaments}
                        />))}
            </div>)
    } 

    return (
        <div>
            <div className={s.container}>
                <Order setOrder={setOrder} setCurrentPage={setCurrentPage}/>
                <Filter setCurrentPage={setCurrentPage} temperaments={temperaments}/>
                {currentDogs && currentDogs.map(dog => (
                    <DogCard key={dog.id}
                        id={dog.id}
                        image={dog.image}
                        name={dog.name}
                        weight={dog.weight}
                        temperaments={dog.temperaments}
                    />

                ))}
            </div>
            {dogs && <Paginado dogs={dogs.length} 
                dogsPerPage={dogsPerPage}
                handlePaginado={handlePaginado}
                />}
        </div>

    )
}