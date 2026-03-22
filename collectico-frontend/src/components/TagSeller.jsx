import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function TagSeller({onChange, value, width='500px'}) {
  return (
    <Autocomplete
      onChange={onChange}
      value={value}
      multiple
      limitTags={3}
      id="multiple-limit-tags"
      options={typeProduct}
      getOptionLabel={(option) => option.title}
      renderInput={(tag) => (
        <TextField {...tag} label="Product Tag" placeholder="Styles, Artist, ..." />
      )}
      sx={{
        width: width,
        '& .MuiChip-root': {
          backgroundColor: '#f2eee7',
          color: '#49352a',
          fontWeight: 'bold',
          border: '1px solid #49352a',
        },
        '& .MuiChip-root:hover': {
          backgroundColor: '#f0e0d0',
        },
        '& .MuiChip-deleteIcon': {
          color: "#49352a",
        },
      }}
    />
  );
}

const typeProduct = [
  { title: 'Classic'},
  { title: 'Modern'},
  { title: 'Contemporary'},
  { title: 'Portrait'},
  { title: 'Landscape'},
  { title: 'Genre'},
  { title: 'Abstract'},
  { title: 'Historical'},
  { title: 'Auction'},
];