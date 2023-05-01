import React, { useEffect, useState, useRef } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { fetchCountriesData, fetchCountryLables } from '../../api/countries';
import { fetchMethaneData } from '../../api/methane/index';
import AutocompleteComponent from '../AutoComplete/AutoComplete';
import { BarChart } from '../Charts/BarChart';
import { DualChart } from '../Charts/DualChart';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../../features/methane/methaneSlice';
import { setCountry } from '../../features/countries/countrySlice';

import BasicLoader from '../Loaders/BasicLoader';
import { ICountriesData } from '../../types/countries';

export const Dashboard2 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [countriesData, setCountriesData] = useState<ICountriesData>()
  const [countryLabels, setCountryLabels] = useState<string[]>([])
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US')
  const mounted = useRef(false);

  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)
  const countries_data = useSelector((state: RootState) => state.country.value)


  const getCountriesData = async () => {
    try {
      mounted.current = true;
      const result = await fetchCountriesData();

      if (mounted.current) {
        setCountriesData(result);
        dispatch(setCountry(result))

      }
    } catch (error) {
      setError("Failed to fetch countries data");
    }
  }

  const getCountryLables = async () => {
    try {
      mounted.current = true;
      const result = await fetchCountryLables();

      console.log('the country labels', result)

      if (mounted.current) {
        setCountryLabels(result);
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
        if (countries_data) console.log('Countries data', countries_data[selectedCountryCode])
        else console.log('no data')
      }

      setLoading(false)

    } catch (error) {
      setError("Failed to fetch methane data");
      setLoading(false)
    }
  }



  const getNamesOfCountriesInArray = (data: ICountriesData) => {
    console.log('DATA ===>', data)
  }


  // function required to due to MUI Button onClick type
  const triggerMethaneDataFetch = () => getMethaneData(selectedCountryCode)

  useEffect(() => {
    mounted.current = true
    if (mounted.current) getMethaneData(selectedCountryCode)
    return () => { mounted.current = false };
  }, [])

  useEffect(() => {
    mounted.current = true
    if (mounted.current) {
      getCountryLables()
      getCountriesData()
      if (countries_data) getNamesOfCountriesInArray(countries_data)
    }

    return () => { mounted.current = false };
  }, [])


  useEffect(() => {
    console.log('Countries Data ===> ', countries_data)
  })

  if (!countries_data) return <div><BasicLoader /></div>

  return (
    <>{!countries_data ? <BasicLoader /> :
      (<Grid sx={{ maxWidth: '100%', m: '0 auto' }} container spacing={3} p={3}>
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="left">
            Country: {countries_data[selectedCountryCode]} - {selectedCountryCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AutocompleteComponent
            onChange={(e) => setSelectedCountryCode(e)}
            onSelect={(e) => setSelectedCountryCode(e)}
            label="Choose a country ID"
            options={countryLabels}
            data={countries_data}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Button
              sx={{ mt: 4, width: '100%' }}
              disabled={!countryLabels.includes(selectedCountryCode)}
              variant="contained"
              onClick={triggerMethaneDataFetch}
            >
              Get Data
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {!loading ? <BarChart category="Methane" label={methane_data} /> : <BasicLoader />}
        </Grid>
        <Grid item xs={6}>
          {!loading ? <DualChart category="Carbon Minoxide" label={methane_data} /> : <BasicLoader />}
        </Grid>
      </Grid>)
    }
    </>
  )
}

