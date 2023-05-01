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

  const uniqueOptions = options.filter(function (item, pos) {
    return options.indexOf(item) === pos;
  });

  return (
    <Autocomplete
      options={uniqueOptions}
      getOptionLabel={(option) => `${data[option]} - ${option}`}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          onSelect={() => handleOnChange}
          onChange={() => handleOnChange} // remove the parentheses
          onBlur={() => handleOnChange} // remove the parentheses
          disabled={true}
          sx={{
            '& .Mui-disabled': {
              bgcolor: 'transparent',
              cursor: 'pointer',
              caretColor: 'transparent',
              color: 'black',
              '-webkit-text-fill-color': 'rgba(0, 0, 0, 1) !important',
            },
          }}
        />
      )}
      onChange={(event, value) => handleOnSelect(value || '')}
    />

  );
};

export default AutocompleteComponent;
