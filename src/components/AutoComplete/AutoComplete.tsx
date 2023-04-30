import React, { SetStateAction } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface Props {
  options: string[];
  label: string;
  onChange: (value: SetStateAction<string>) => void;
  onSelect: (value: any) => void;
}

const AutocompleteComponent: React.FC<Props> = ({ options, label, onChange, onSelect }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('The on change value', event.target.value);
    onChange(event.target.value);
  };

  const handleOnSelect = (value: SetStateAction<string>) => {
    console.log('the on select value', value)
    onSelect(value);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          onChange={handleOnChange}
        />
      )}
      onChange={(event, value) => handleOnSelect(value || '')}
    />
  );
};

export default AutocompleteComponent;
