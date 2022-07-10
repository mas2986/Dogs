import React, {useState} from 'react';
import s from '../style/Form.module.css';

export default function CreateDog(){
    const [input, setInput] = useState({
        name: '',
        weight:0,
        height:0,
        lifeSpan:0,
        temperaments:[]
    })

    const handleInput = (e) =>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    return(
        <form className={s.container}>
            <h3>Crear raza</h3>
            <div className={s.campo}>
                <label>Raza: </label>
                    <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange = {handleInput}
                    placeholder='Coloca la raza de tu perro'
                    />
            </div>
            <div className={s.campo}>                
                <label>Peso</label>
                <input type="number"
                value={input.weight}
                name="weight"
                onChange = {handleInput}
                placeholder="Peso de tu perro"
                />
            </div>
            <div className={s.campo}>
                    <label>Altura</label>
                    <input type="number"
                    value={input.height}
                    name="height"
                    onChange = {handleInput}
                    placeholder="Altura de tu perro"/>
                </div>
            <div className={s.campo}>
                <label>Años de vida</label>
                <input type="number"
                value={input.lifeSpan}
                name="lifeSpan"
                onChange = {handleInput}
                placeHolder="Años de vida de tu perro"/>
            </div>
            <div className={s.campo}>
                <label>Temperamento</label>
                <input type="text"
                value={input.temperaments}
                name="temperaments"
                onChange = {handleInput}
                placeHolder="Temperamento de tu perro"/>
            </div>            
            <button disabled={true} type='submit'>Crear raza</button>
        </form>
    )
}