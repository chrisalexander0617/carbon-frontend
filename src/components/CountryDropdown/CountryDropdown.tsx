import { useState } from 'react';
import { Autocomplete, FormControl, InputLabel, Select, MenuItem, TextField, SelectChangeEvent } from '@mui/material'
import { makeStyles } from '@mui/styles';
interface DropdownInputProps {
  options: string[];
  handleUpdateCountryQuery: (q: string) => void
}

const useStyles = makeStyles(() => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: 1,
  },
}));

function CountryDropdown({ options, handleUpdateCountryQuery }: DropdownInputProps) {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    setSelectedOption(value ?? '');
    handleUpdateCountryQuery(value ?? '');
  };

  return (
    <Autocomplete
      className={classes.formControl}
      id="country-autocomplete"
      options={options}
      value={selectedOption}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          value={selectedOption}
          {...params}
          label="Select a country"
        />
      )}
    />
  );
}

export default CountryDropdown;
