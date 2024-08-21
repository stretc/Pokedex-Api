import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import pokeballSvg from './assets/Pokeball/2.svg';
import RadarChart from './RadarChart';

const ariaLabel = { 'aria-label': 'description' };

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  const [image, setImage] = useState(pokeballSvg);
  const [number, setNumber] = useState('Searching...');
  const [name, setName] = useState('Searching...');
  const [type, setType] = useState('Searching...');
  const [attack, setAttack] = useState('Searching...');
  const [defense, setDefense] = useState('Searching...');
  const [spAttack, setSpAttack] = useState('Searching...');
  const [spDefense, setSpDefense] = useState('Searching...');
  const [speed, setSpeed] = useState('Searching...');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/pokedex');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const foundPokemon = data.find(pokemon => pokemon.name.toLowerCase() === searchTerm.toLowerCase());

      if (foundPokemon) {
        setImage(foundPokemon.pokePic || pokeballSvg);
        setNumber(foundPokemon.number || 'Searching...');
        setName(foundPokemon.name || 'Searching...');
        setType(foundPokemon.type || 'Searching...');
        setAttack(foundPokemon.attack || 'Searching...');
        setDefense(foundPokemon.defense || 'Searching...');
        setSpAttack(foundPokemon.spAttack || 'Searching...');
        setSpDefense(foundPokemon.spDefense || 'Searching...');
        setSpeed(foundPokemon.speed || 'Searching...');
        setPokemonData(foundPokemon);
      } else {
        setNumber('Searching...');
        setName('Searching...');
        setType('Searching...');
        setAttack('Searching...');
        setDefense('Searching...');
        setSpAttack('Searching...');
        setSpDefense('Searching...');
        setSpeed('Searching...');
        setPokemonData(null);
      }
      setError('');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);

      setNumber('Searching...');
      setName('Searching...');
      setType('Searching...');
      setAttack('Searching...');
      setDefense('Searching...');
      setSpAttack('Searching...');
      setSpDefense('Searching...');
      setSpeed('Searching...');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Picodex</h1>
      </header>
      <nav className='main-nav grid-container'>
        <ul className='main-nav-list'>
          <li className='item'>Tools</li>
          <li className='item'>Resources</li>
          <li className='item'>Contact</li>
          <li className='item login'>Login/Signup</li>
        </ul>
      </nav>
      <main id='main' className='main-content grid-container'>
        <h1>Search for them all!</h1>
        <div className='input'>
          <Box
            sx={{
              marginTop: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <Input
              placeholder='Search...'
              type='text'
              inputProps={ariaLabel}
              value={searchTerm}
              onChange={handleChange}
            />
            <Button
              variant='outlined'
              type='submit'
              sx={{
                marginTop: '16px',
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </div>
        <div className='stats'>
          <img src={image} alt='Pokeball' className='pokeball-svg' />
          <div className='stats-content'>
            <p className='number'>Number: {number}</p>
            <p className='name'>Name: {name}</p>
            <p className='type'>Type: {type}</p>
            <p className='attack'>Attack: {attack}</p>
            <p className='defense'>Defense: {defense}</p>
            <p className='sp-attack'>Sp. Attack: {spAttack}</p>
            <p className='sp-defense'>Sp. Defense: {spDefense}</p>
            <p className='speed'>Speed: {speed}</p>
          </div>
          <div className='chart'>
            {pokemonData && <RadarChart data={pokemonData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
