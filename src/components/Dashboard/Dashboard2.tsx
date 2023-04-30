import React, { useEffect, useState, useRef } from 'react'
import { Button, Grid } from '@mui/material';
import { fetchCountriesData } from '../../api/countries';
import { fetchMethaneData } from '../../api/methane/index';
import { IMethaneData } from '../../types/methane';
import AutocompleteComponent from '../AutoComplete/AutoComplete';
import { BarChart2 } from '../Charts/BarChart2';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../../features/methane/methaneSlice';

export const Dashboard2 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [countriesData, setCountriesData] = useState<string[]>([])
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US')
  const mounted = useRef(false);

  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)

  const getCountriesData = async () => {
    try {
      mounted.current = true;
      const result = await fetchCountriesData();

      if (mounted.current) {
        setCountriesData(result);
      }
    } catch (error) {
      setError("Failed to fetch countries data");
    }
  }

  const getMethaneData = async (countryCode: string) => {
    setLoading(true)

    try {
      const result = await fetchMethaneData(countryCode);

      if (mounted.current) {
        dispatch(set(result))
      }

      setLoading(false)

    } catch (error) {
      setError("Failed to fetch methane data");
      setLoading(false)
    }
  }

  // function required to due to MUI Button onClick type
  const triggerMethaneDataFetch = () => getMethaneData(selectedCountryCode)

  useEffect(() => {
    mounted.current = true
    console.log(selectedCountryCode + '!!!')
    if (mounted.current) getMethaneData(selectedCountryCode)
    return () => { mounted.current = false };
  }, [])

  useEffect(() => {
    mounted.current = true
    console.log(selectedCountryCode + '!!!')

    if (mounted.current) getCountriesData()
    return () => { mounted.current = false };
  }, [])


  return (
    <Grid sx={{ width: '1200px', maxWidth: '100%', m: '0 auto' }} container spacing={3} p={3}>
      <Grid item xs={12}>
        <h1>Country: {selectedCountryCode}</h1>
      </Grid>
      <Grid item xs={12}>
        <AutocompleteComponent
          onChange={(e) => setSelectedCountryCode(e)}
          onSelect={(e) => setSelectedCountryCode(e)}
          label="Choose a country ID"
          options={countriesData}
        />
      </Grid>
      <Grid item>
        {!countriesData.includes(selectedCountryCode) && (
          <h2>No country code found from your input</h2>
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Button
            sx={{ mt: 4, width: '100%' }}
            disabled={!countriesData.includes(selectedCountryCode)}
            variant="contained"
            onClick={triggerMethaneDataFetch}
          >
            Get Data
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BarChart2 category="Methane" label={methane_data} />
      </Grid>
    </Grid>
  )
}

