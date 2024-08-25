import React, { useState, useEffect } from 'react';
import './App.css';
import { colors, styles } from './assets/TypeStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import pokeballSvg from './assets/Pokeball/2.svg';
import { IconReact, IconNodejs, IconExpress } from './assets/svgPaths';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState('');

  const [image, setImage] = useState(pokeballSvg);
  const [number, setNumber] = useState('Searching...');
  const [name, setName] = useState('Searching...');
  const [total, setTotal] = useState('Searching...');
  const [types, setTypes] = useState([]);
  const [attack, setAttack] = useState('Searching...');
  const [defense, setDefense] = useState('Searching...');
  const [spAttack, setSpAttack] = useState('Searching...');
  const [spDefense, setSpDefense] = useState('Searching...');
  const [speed, setSpeed] = useState('Searching...');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/pokedex')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data);
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
        const pokemonTypes = foundPokemon.type ? foundPokemon.type.split(',').map(type => type.trim()) : [];
        setTypes(pokemonTypes);
        setAttack(foundPokemon.attack || 'Searching...');
        setDefense(foundPokemon.defense || 'Searching...');
        setSpAttack(foundPokemon.spAttack || 'Searching...');
        setSpDefense(foundPokemon.spDefense || 'Searching...');
        setSpeed(foundPokemon.speed || 'Searching...');
        setPokemonData(foundPokemon);
        setIsExpanded(true); // Expand the content when data is found
      } else {
        setImage(pokeballSvg);
        setNumber('Searching...');
        setName('Searching...');
        setTotal('Searching...');
        setTypes([]);
        setAttack('Searching...');
        setDefense('Searching...');
        setSpAttack('Searching...');
        setSpDefense('Searching...');
        setSpeed('Searching...');
        setPokemonData(null);
        setIsExpanded(false); // Collapse the content when no data is found
      }
      setError('Nothing found!');
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
      setImage(pokeballSvg);
      setNumber('Searching...');
      setName('Searching...');
      setTotal('Searching...');
      setTypes([]);
      setAttack('Searching...');
      setDefense('Searching...');
      setSpAttack('Searching...');
      setSpDefense('Searching...');
      setSpeed('Searching...');
      setIsExpanded(false); // Collapse the content on error
    }
  };

  const typeColors = types.map(type => colors[type.toLowerCase()] || 'black');

  return (
    <div className="App">
      <header className="App-header grid-container">
        <h1>Picodex</h1>
      </header>
      <main id="main" className={`main-content grid-container ${isExpanded ? 'expanded' : ''}`}>
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
                <img src={image} alt={pokeballSvg} className='poke-image' />
              </div>
              <div className='poke-stats'>
                <p style={styles.number} className='number'># {number}</p>
                <p style={styles.name} className='name'>{name}</p>
                <div className='pokemon-types'>
                  {types.map((type, index) => (
                    <p key={index} className='type' style={{
                      backgroundColor: typeColors[index],
                      color: '#fff',
                    }}>
                      {type}
                    </p>
                  ))}
                </div>
                <p style={styles.attack} className='attack'>Attack: {attack}</p>
                <p style={styles.defense} className='defense'>Defense: {defense}</p>
                <p style={styles.spAttack} className='sp-attack'>
                  Sp. Attack: {spAttack}
                </p>
                <p style={styles.spDefense} className='sp-defense'>
                  Sp. Defense: {spDefense}
                </p>
                <p style={styles.speed} className='speed'>Speed: {speed}</p>
              </div>
              <div className='total-div'>
                <p style={styles.total} className='total'>Total: {total}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className='footer-div'>
          <IconReact />
          <IconNodejs />
          <IconExpress />
          <a href='https://pokemondb.net/pokedex/all' target='_blank'>Resource</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
