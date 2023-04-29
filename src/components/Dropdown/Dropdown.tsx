import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles';

interface DropdownInputProps {
  options: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 1,
  },
}));


function Dropdown({ options }: DropdownInputProps) {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="dropdown-label">Select an option</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
