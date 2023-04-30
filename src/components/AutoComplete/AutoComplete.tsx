import React, { SetStateAction, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ICountriesData } from '../../types/countries';

interface Props {
  options: string[];
  label: string;
  onChange: (value: SetStateAction<string>) => void;
  onSelect: (value: any) => void;
  data: ICountriesData
}

const AutocompleteComponent: React.FC<Props> = ({ options, label, onChange, onSelect, data }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleOnSelect = (value: SetStateAction<string>) => {
    onSelect(value);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => data[option]}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          onChange={() => handleOnChange}
          onBlur={() => handleOnChange}
          disabled={true}
          sx={{
            '& .Mui-disabled': {
              bgcolor: 'transparent',
              color: 'black',
              '-webkit-text-fill-color': 'rgba(0, 0, 0, 1) !important',
            }
          }}
        />
      )}
      onChange={(event, value) => handleOnSelect(value || '')}
    />
  );
};

export default AutocompleteComponent;
