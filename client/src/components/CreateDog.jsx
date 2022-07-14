import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {getTemperaments,addDog} from '../redux/action'
import s from '../style/CreateDog.module.css';

function validate(input){
    let errors = {};
    console.log(input)
    if(!input.name) {errors.name = 'Este campo es obligatorio';errors.disabled = true}
    if(!input.temperament) {errors.temperament = 'Este campo es obligatorio';errors.disabled = true}
    else if(input.temperament.length===0) errors.disabled = true;
    // if(!input.weigth) errors.weigth = 'Este campo es obligatorio';    
    if (input.weightMax<0 || input.weightMin<0) {errors.weight = 'Este campo no puede ser inferior a 0';errors.disabled = true}
    else if(input.weightMax===0 || input.weightMin===0) errors.disabled = true;
    else if(input.weightMin>input.weightMax) {errors.weight = 'El peso mínimo no puede ser superior al peso máximo';errors.disabled = true}

    if (input.heightMax<0 || input.heightMin<0) {errors.height = 'Este campo no puede ser inferior a 0';errors.disabled = true}
    
    else if(input.heightMin>input.heightMax) {errors.height = 'La altura mínima no puede ser superior a la altura máxima';errors.disabled = true}

    if (input.lifeSpanMax<0 || input.lifeSpanMin<0) {errors.lifeSpan = 'Este campo no puede ser inferior a 0';errors.disabled = true}
    
    else if(input.lifeSpanMin>input.lifeSpanMax) {errors.lifeSpan = 'Los años de vida mínimo no puede ser superior a los años de vida máximo';errors.disabled = true}
    
    console.log(errors);
    if(Object.keys(errors).length===0) errors.disabled = false;
    return errors;
}

export default function CreateDog(){
    const [disabled,setDisabled] = useState(true);
    const [input, setInput] = useState({
        name: '',
        weightMin:0,
        weightMax:0,
        heightMin:0,
        heightMax:0,
        lifeSpanMin:0,
        lifeSpanMax:0,
        temperament:[],        
    })
    const history = useHistory();
    const [errors,setErrors] = useState({disabled:true});
    const dispatch = useDispatch();
    const temperament = useSelector(state=>state.temperaments);

    const handleInput = (e) =>{
        e.preventDefault();
        setInput({
            ...input,            
            [e.target.name]:e.target.value
        })        
        let errorsValidate = validate({...input,[e.target.name]:e.target.value});
        setErrors(()=>errorsValidate)        
    }

    const handleSelect = (e) =>{
        e.preventDefault();
        setInput((prevState)=>{
            return{
                ...prevState,                
                temperament: [...prevState.temperament,e.target.value]
            }
        })
        let errorsValidate = validate({...input,temperament:e.target.value});     
    }

    const handleSubmit = (e)=>{
        e.preventDefault();        
        dispatch(addDog(input));
        history.push('/home');
    }


    useEffect(()=>{
        if(temperament.length===0)  dispatch(getTemperaments());
    },[])

    return(
      
         <form className={s.container}>
            <h3>Crear raza</h3>
            <div className={s.campo}>
                <label>Raza: </label>
                    <input type="text"
                    className={errors.name && s.danger}
                    value={input.name}
                    name="name"
                    onChange = {handleInput}
                    placeholder='Coloca la raza de tu perro'
                    />                
            </div>
            {errors.name?<p className={s.dangerText}>{errors.name}</p>:null}
            <div className={s.campo}>                
                <label>Peso</label>
                <input type="number"
                className={errors.weight && s.danger}
                value={input.weightMax}
                name="weightMax"
                onChange = {handleInput}
                placeholder="Peso máximo de tu perro"
                />              
                <input type="number"
                className={errors.weight && s.danger}
                value={input.weightMin}
                name="weightMin"
                onChange = {handleInput}
                placeholder="Peso mínimo de tu perro"
                />   
            </div>
            {errors.weight?<p className={s.dangerText}>{errors.weight}</p>:null}
            <div className={s.campo}>
                    <label>Altura</label>                   
                    <input type="number"
                    className={errors.height && s.danger}
                    value={input.heightMax}
                    name="heightMax"
                    onChange = {handleInput}
                    placeholder="Altura máxima de tu perro"
                    />
                     <input type="number"
                    className={errors.height && s.danger}
                    value={input.heightMin}
                    name="heightMin"
                    onChange = {handleInput}
                    placeholder="Altura mínima de tu perro"
                    />
            </div>
            {errors.height?<p className={s.dangerText}>{errors.height}</p>:null}
            <div className={s.campo}>
                <label>Años de vida</label>            
                <input type="number"
                className={errors.lifeSpan && s.danger}
                value={input.lifeSpanMax}
                name="lifeSpanMax"
                onChange = {handleInput}
                placeholder="Años de vida máximos de tu perro"
                />  
                <input type="number"
                className={errors.lifeSpan && s.danger}
                value={input.lifeSpanMin}
                name="lifeSpanMin"
                onChange = {handleInput}
                placeholder="Años de vida mínimos de tu perro"
                />                    
            </div>
            {errors.lifeSpan?<p className={s.dangerText}>{errors.lifeSpan}</p>:null}
            <label>Temperamento</label>
            <select onChange={handleSelect} name="temperament">
                <option value="" selected hidden>Elige el/los temperamentos de tu perro</option>
                {temperament&&temperament.map((el,i)=><option key={i} value={el.name}>{el.name}</option>)}
            </select>    
            <ul>
                {input.temperament&&input.temperament.map(el=>
                    <li key={el}>{el}</li>
                )}
            </ul> 
            <div>
                {console.log('errors',!!(Object.keys(errors).length))}
                {console.log('disabled',!!(errors.disabled))}
                <button disabled={errors.disabled} type='submit' onClick={handleSubmit}>Crear raza</button>                
            </div>               
        </form> 
    )
}