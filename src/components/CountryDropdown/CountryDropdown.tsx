import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { makeStyles } from '@mui/styles';
interface DropdownInputProps {
  options: string[];
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


function CountryDropdown({ options }: DropdownInputProps) {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  console.log('CountriesDropdown', options)

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="dropdown-label">Select an option</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountryDropdown;
