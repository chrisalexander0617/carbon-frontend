import React, { useEffect, useState, useRef } from 'react'
import * as MUI from '@mui/material';
import { fetchCountryLables } from '../../api/countries';
import AutocompleteComponent from '../AutoComplete/AutoComplete';
import { BarChart } from '../Charts/BarChart';
import { DualChart } from '../Charts/DualChart';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { setCountry } from '../../features/countries/countrySlice';
import { useTheme } from "@mui/material/styles";
import { getCountriesData } from '../../api/countries';
import { getMethaneData } from '../../api/methane/index';
import BasicLoader from '../Loaders/BasicLoader';
import { getCarbonMonoxideData } from '../../api/carbonmonoxide/index';

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [loadingCarbonMonoxideData, setLoadingCarbonMonoxideData] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [countryLabels, setCountryLabels] = useState<string[]>([])
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('US')
  const mounted = useRef(false);
  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)
  const carbonmonoxide_data = useSelector((state: RootState) => state.carbonmonoxide.value)
  const countries_data = useSelector((state: RootState) => state.country.value)

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

  const triggerDataFetch = (e: any) => {
    getMethaneData(mounted, dispatch, e, setError, setLoading)
    getCarbonMonoxideData(mounted, dispatch, e, setError, setLoadingCarbonMonoxideData)
    setSelectedCountryCode(e)
  }

  const selectAndUpdateGraphs = (e: any) => {
    setError(null)
    setLoading(true)
    triggerDataFetch(e)
  }

  useEffect(() => {
    mounted.current = true
    if (mounted.current) {
      getCountryLables()
      getCountriesData(mounted, dispatch, setError, setCountry)
      getCarbonMonoxideData(mounted, dispatch, selectedCountryCode, setError, setLoadingCarbonMonoxideData)
      getMethaneData(mounted, dispatch, selectedCountryCode, setCountry, setLoading)
    }

    return () => { mounted.current = false };
  }, [])

  if (!countries_data) return <div><BasicLoader /></div>

  return (
    <>{!countries_data ? <BasicLoader /> :
      (<MUI.Grid sx={{ backgroundColor: theme.palette.primary.main }} container maxWidth="fluid" spacing={10} p={3}>
        <MUI.Grid item xs={12}>
          <MUI.Typography color={theme.palette.secondary.main} variant="h1" textAlign="left">
            {countries_data[selectedCountryCode]}
          </MUI.Typography>
        </MUI.Grid>
        <MUI.Grid item xs={12}>
          <AutocompleteComponent
            onChange={(e) => selectAndUpdateGraphs(e)}
            onSelect={(e) => selectAndUpdateGraphs(e)}
            label="Choose a country ID"
            options={countryLabels}
            data={countries_data}
          />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          {!loading && methane_data.length > 0 ? <BarChart category="Methane" label={methane_data} /> : <BasicLoader message={error} />}
        </MUI.Grid>
        <MUI.Grid item xs={12} md={6}>
          {!loadingCarbonMonoxideData && carbonmonoxide_data.length > 0 ? <DualChart category="Carbon Monoxide" label={carbonmonoxide_data} /> : <BasicLoader message={error} />}
        </MUI.Grid>
      </MUI.Grid >)
    }
    </>
  )
}

export default Dashboard
