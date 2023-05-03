import { render, screen } from '@testing-library/react';
import Autocomplete from '../components/AutoComplete/AutoComplete';

describe('Autocomplete', () => {
  const options = ['US', 'CA', 'GB'];
  const label = 'Choose a country ID';
  const onChange = jest.fn();
  const onSelect = jest.fn();
  const data = { US: 'United States', CA: 'Canada' };

  it('should render Autocomplete', () => {
    render(
      <Autocomplete
        options={options}
        label={label}
        onChange={onChange}
        onSelect={onSelect}
        data={data}
      />
    );

  });

  it('should allow selecting a value from options', () => {
    render(
      <Autocomplete
        options={options}
        label={label}
        onChange={onChange}
        onSelect={onSelect}
        data={data}
      />
    );
  });

  screen.debug()
});

