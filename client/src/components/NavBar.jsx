import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import s from '../style/NavBar.module.css'

export default function NavBar(){
    const [input,setInput] = useState('');
    const history = useHistory();

    const handleInput = (e)=>{
        e.preventDefault();        
        setInput(()=>e.target.value);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(input==='') {
            alert('Escriba una raza para buscar');
            return
        }
        history.push(`/search?name=${input}`);
        setInput('');
    }

    return(
        <nav>
            <ul className={s.container}>
                <Link to='/' className={s.text}>
                    <li>INICIO</li>
                </Link>
                <Link to='/home' className={s.text}>
                    <li>HOME</li>
                </Link>
                <Link to='/create' className={s.text}>
                    <li>CREAR DOG</li>
                </Link>
                <div>
                    <input 
                    value={input}
                    onChange={handleInput} 
                    type="text"
                    placeholder='Búsqueda por raza'/>
                    <input type='submit' onClick={handleSubmit} value="Buscar"/>
                </div>
            </ul>
        </nav>
    )
}