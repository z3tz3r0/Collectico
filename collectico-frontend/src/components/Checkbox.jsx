import { Checkbox } from '@mui/material';
import { FormControlLabel, Stack } from '@mui/material';
import React from 'react';

export default function CustomCheckbox({ label }) {
  return (
    <Stack>
      <FormControlLabel
        control={<Checkbox />}
        label={label}
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 18 },
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
          },
        }}
      />
    </Stack>
  );
}