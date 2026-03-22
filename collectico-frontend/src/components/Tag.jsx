import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function Tag({nameTag, linkPath}) {
  const handleClick = () => {
    window.location.href = linkPath;
  };

  return (
      <Chip label={nameTag} onClick={handleClick}
      sx={{
          backgroundColor: '#f2eee7',
          color: '#49352a',
          fontWeight: 'bold',
          border: '1px solid #49352a',
          "&:hover" : {backgroundColor: '#f0e0d0'},
        }
      }/>
  );
}