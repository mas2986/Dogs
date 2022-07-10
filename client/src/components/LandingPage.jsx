import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h3>Bienvenidos a Henry Dogs</h3>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}