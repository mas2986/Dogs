import React from 'react';
import './App.css';
import { Route,Link } from 'react-router-dom';
import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import Detalle from './components/Detalle';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div>
        <h1>Henry Dogs</h1>
        <div>
          <Route exact path='/' component={LandingPage}/>        
          <Route exact path='/home' component={Home}/>
          <Route exact path='/create' component={CreateDog}/>
          <Route exact path='/detalle/:id' render={({match})=><Detalle match={match}/>}/>
          <Route path='/search' render={({location})=><Home location={location}/>}/>
        </div>
      </div>
    </div>
  );
}

export default App;
