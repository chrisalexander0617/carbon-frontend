import React, { SetStateAction } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ICountriesData } from '../../types/countries';
import { theme } from '../../../src/app/theme'

interface Props {
  options: string[];
  label: string;
  onChange: (value: SetStateAction<string>) => void;
  onSelect: (value: any) => void;
  data: ICountriesData
}

const AutocompleteComponent: React.FC<Props> = ({
  options,
  label,
  onChange,
  onSelect,
  data
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleOnSelect = (value: SetStateAction<string>) => {
    onSelect(value);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${data[option]} - ${option}`}
      disableClearable
      sx={{ backgroundColor: theme.palette.background.default }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="filled"
          onSelect={() => handleOnChange}
          onChange={() => handleOnChange}
          onBlur={() => handleOnChange}
          role="option"
          disabled={true}
          sx={{
            '& .Mui-disabled': {
              cursor: 'pointer',
              fontSize: 20,
            },
          }}
        />
      )}
      onChange={(event, value) => handleOnSelect(value || '')}
    />
  );
};

export default AutocompleteComponent;