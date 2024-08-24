import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InputComponent() {
  const [pokType, setPokType] = React.useState('');

  const handleChange = (event) => {
    setPokType(event.target.value);
  };

  return (
    <div id='filter'>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={pokType}
          onChange={handleChange}
          autoWidth
          label="Type:"
        >
          <MenuItem value="">-All-</MenuItem>
          <MenuItem value='normal'>Normal</MenuItem>
          <MenuItem value='fire'>Fire</MenuItem>
          <MenuItem value='electric'>Electric</MenuItem>
          <MenuItem value='grass'>Grass</MenuItem>
          <MenuItem value='water'>Water</MenuItem>
          <MenuItem value='bug'>Bug</MenuItem>
          <MenuItem value='rock'>Rock</MenuItem>
          <MenuItem value='ice'>Ice</MenuItem>
          <MenuItem value='fighting'>Fighting</MenuItem>
          <MenuItem value='psychic'>Psychic</MenuItem>
          <MenuItem value='Ghost'>Ghost</MenuItem>
          <MenuItem value='flying'>Flying</MenuItem>
          <MenuItem value='dragon'>Dragon</MenuItem>
          <MenuItem value='steel'>Steel</MenuItem>
          <MenuItem value='fairy'>Fairy</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}