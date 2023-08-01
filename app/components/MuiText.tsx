import { TextField } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

export default function MuiText({
    label,
    setFunction
}: {
    label: string;
    setFunction: Dispatch<SetStateAction<string>>;
}) {
  return (
    <TextField
      id='outlined-search'
      label={label}
      type='search'
      sx={{ input: { color: 'black' } }}
      margin='dense'
      onChange={(e) => setFunction(e.target.value)}
    />
  );
}
