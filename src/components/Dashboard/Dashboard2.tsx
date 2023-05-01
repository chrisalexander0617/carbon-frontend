import React, { useEffect, useState, useRef } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { fetchCountriesData, fetchCountryLables } from '../../api/countries';
import { fetchMethaneData } from '../../api/methane/index';
import { fetchCarbonMonoxideData } from '../../api/carbonmonoxide/index';
import AutocompleteComponent from '../AutoComplete/AutoComplete';
import { BarChart } from '../Charts/BarChart';
import { DualChart } from '../Charts/DualChart';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../../features/methane/methaneSlice';
import { setCountry } from '../../features/countries/countrySlice';
import { setCarbonMonoxide } from '../../features/carbonmonoxide/carbonmonoxideSlice';
import { useTheme } from "@mui/material/styles";

import BasicLoader from '../Loaders/BasicLoader';
import { ICountriesData } from '../../types/countries';

export const Dashboard2 = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [loadingCarbonMonoxideData, setLoadingCarbonMonoxideData] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [countriesData, setCountriesData] = useState<ICountriesData>()
  const [countryLabels, setCountryLabels] = useState<string[]>([])
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US')
  const mounted = useRef(false);

  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)
  const carbonmonoxide_data = useSelector((state: RootState) => state.carbonmonoxide.value)
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
        setLoading(false)
      }


    } catch (error) {
      setError("Failed to fetch methane data");
      setLoading(false)
    }
  }


  const getCarbonMonoxideData = async (countryCode: string) => {
    setLoadingCarbonMonoxideData(true)

    try {
      const result = await fetchCarbonMonoxideData(countryCode);

      if (mounted.current) {
        dispatch(setCarbonMonoxide(result))
        setLoadingCarbonMonoxideData(false)
      }


    } catch (error) {
      setError("Failed to fetch methane data");
      setLoadingCarbonMonoxideData(false)
    }
  }




  // function required to due to MUI Button onClick type

  const triggerDataFetch = () => {
    getMethaneData(selectedCountryCode)
    getCarbonMonoxideData(selectedCountryCode)
  }

  const selectAndUpdateGraphs = (e: string) => {
    setSelectedCountryCode(e)
    triggerDataFetch()
  }


  useEffect(() => {
    mounted.current = true
    if (mounted.current) {
      getMethaneData(selectedCountryCode)
      getCarbonMonoxideData(selectedCountryCode)
    }
    return () => { mounted.current = false };
  }, [])

  useEffect(() => {
    mounted.current = true
    if (mounted.current) {
      getCountryLables()
      getCountriesData()
    }

    return () => { mounted.current = false };
  }, [])

  if (!countries_data) return <div><BasicLoader /></div>

  return (
    <>{!countries_data ? <BasicLoader /> :
      (<Grid sx={{ backgroundColor: theme.palette.primary.main }} container spacing={3} p={3}>
        <Grid item xs={12}>
          <Typography color={theme.palette.secondary.main} variant="h3" textAlign="left">
            Country: {countries_data[selectedCountryCode]} - {selectedCountryCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AutocompleteComponent
            onChange={(e) => setSelectedCountryCode(e)}
            onSelect={(e) => selectAndUpdateGraphs(e)}
            label="Choose a country ID"
            options={countryLabels}
            data={countries_data}
          />
        </Grid>
        <Grid item xs={6}>
          {!loading ? <BarChart category="Methane" label={methane_data} /> : <BasicLoader />}
        </Grid>
        <Grid item xs={6}>
          {!loadingCarbonMonoxideData ? <DualChart category="Carbon Monoxide" label={carbonmonoxide_data} /> : <BasicLoader />}
        </Grid>
      </Grid>)
    }
    </>
  )
}

