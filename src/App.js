import React, { useState, useEffect } from 'react';
import './App.css';
import colors from './assets/TypeColors';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import pokeballSvg from './assets/Pokeball/2.svg';
import RadarChart from './Components/RadarChart';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState('');

  const [image, setImage] = useState(pokeballSvg);
  const [number, setNumber] = useState('Searching...');
  const [name, setName] = useState('Searching...');
  const [total, setTotal] = useState('Searching...');
  const [type, setType] = useState('Searching...');
  const [attack, setAttack] = useState('Searching...');
  const [defense, setDefense] = useState('Searching...');
  const [spAttack, setSpAttack] = useState('Searching...');
  const [spDefense, setSpDefense] = useState('Searching...');
  const [speed, setSpeed] = useState('Searching...');

  useEffect(() => {
    fetch('http://localhost:5000/api/pokedex')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data); // Store the entire Pokémon list
      })
      .catch((error) => console.error('Error fetching the Pokémon data:', error));
  }, []);

  const handleChange = (event, newValue) => {
    setSearchTerm(newValue || '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const foundPokemon = pokemonList.find(
        (pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (foundPokemon) {
        setImage(foundPokemon.pokePic || pokeballSvg);
        setNumber(foundPokemon.number || 'Searching...');
        setName(foundPokemon.name || 'Searching...');
        setTotal(foundPokemon.total || 'Searching...');
        setType(foundPokemon.type || 'Searching...');
        setAttack(foundPokemon.attack || 'Searching...');
        setDefense(foundPokemon.defense || 'Searching...');
        setSpAttack(foundPokemon.spAttack || 'Searching...');
        setSpDefense(foundPokemon.spDefense || 'Searching...');
        setSpeed(foundPokemon.speed || 'Searching...');
        setPokemonData(foundPokemon);
      } else {
        // Reset fields if no Pokémon is found
        setImage(pokeballSvg);
        setNumber('Searching...');
        setName('Searching...');
        setTotal('Searching...');
        setType('Searching...');
        setAttack('Searching...');
        setDefense('Searching...');
        setSpAttack('Searching...');
        setSpDefense('Searching...');
        setSpeed('Searching...');
        setPokemonData(null);
      }
      setError('Nothing found!');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);

      // Reset fields on error
      setImage(pokeballSvg);
      setNumber('Searching...');
      setName('Searching...');
      setTotal('Searching...');
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
      <section id="main-section grid-container">
        <header className="App-header grid-container">
          <h1>Picodex</h1>
          <nav className="main-nav grid-container">
            <ul className="main-nav-list">
              <li className="item"><a href="#">Tools</a></li>
              <li className="item"><a href="#">Resources</a></li>
            </ul>
          </nav>
        </header>
        <main id="main" className="main-content grid-container">
          <div className="grid-row">
            <div className="grid-col">
              <div className="filters">
                <Box sx={{ padding: '16px' }}>
                  <label htmlFor="filter-name">Name:</label>
                  <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                      freeSolo
                      id="autocomplete"
                      disableClearable
                      options={pokemonList.map((option) => option.name)}
                      onInputChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            sx: {
                              height: '40px',
                            },
                          }}
                        />
                      )}
                    />
                  </Stack>
                  <button className='submit-button' onClick={handleSubmit}>
                    Submit
                  </button>
                </Box>
              </div>
              <div className='pokemon-chosen'>
                <div className='pokemon-chosen-image'>
                  <img src={image} alt={pokeballSvg} className='poke-image inactive' />
                </div>
                <div className='poke-stats'>
                  <p className='number'># {number}</p>
                  <p className='name'>{name}</p>
                  <p className='type'>{type}</p>
                  <p className='attack'>Attack: {attack}</p>
                  <p className='defense'>Defense: {defense}</p>
                  <p className='sp-attack'>
                    Sp. Attack: {spAttack}
                  </p>
                  <p className='sp-defense'>
                    Sp. Defense: {spDefense}
                  </p>
                  <p className='speed'>{speed}</p>
                  <p className='total'>{total}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default App;
