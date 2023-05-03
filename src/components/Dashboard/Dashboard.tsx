import { useEffect, useState, useRef } from 'react'
import * as MUI from '@mui/material';
import AutocompleteComponent from '../AutoComplete/AutoComplete';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux';
import { setCountry } from '../../features/countries/countrySlice';
import { getCountriesData } from '../../api/countries';
import { getMethaneData } from '../../api/methane/index';
import BasicLoader from '../Loaders/BasicLoader';
import { getCarbonMonoxideData } from '../../api/carbonmonoxide/index';
import { theme } from '../../../src/app/theme';
import { setCountryCode } from '../../features/countries/countrycodeSlice';

const Dashboard = () => {
  const [loadingMethaneData, setLoadingMethaneData] = useState(false);
  const [loadingCarbonMonoxideData, setLoadingCarbonMonoxideData] = useState(false);
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [methaneError, setMethaneError] = useState<string | null>(null)
  const [carbonMonxideError, setCarbonMonoxideError] = useState<string | null>(null)
  const mounted = useRef(false);
  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)
  const carbonmonoxide_data = useSelector((state: RootState) => state.carbonmonoxide.value)
  const countries_data = useSelector((state: RootState) => state.country.value)
  const countrycode_data = useSelector((state: RootState) => state.countryCode.value)

  const triggerDataFetch = (e: any) => {
    getMethaneData(mounted, dispatch, e, setMethaneError, setLoadingMethaneData)
    getCarbonMonoxideData(mounted, dispatch, e, setCarbonMonoxideError, setLoadingCarbonMonoxideData)
    dispatch(setCountryCode(e))

  }

  useEffect(() => {
    mounted.current = true

    if (mounted.current) {
      if (!countries_data.length) {
        getCountriesData(mounted, dispatch, setCountriesError, setCountry)
      }

      getMethaneData(mounted, dispatch, countrycode_data, setMethaneError, setLoadingMethaneData)
      getCarbonMonoxideData(mounted, dispatch, countrycode_data, setCarbonMonoxideError, setLoadingCarbonMonoxideData)
    }

    return () => { mounted.current = false };
  }, [])

  if (!countries_data) return <div><BasicLoader message={null} /></div>

  return (
    <>
      <MUI.Grid sx={{ minHeight: 'auto', backgroundColor: theme.palette.primary.main }} container maxWidth="fluid" spacing={5} p={3}>
        <MUI.Grid item xs={12}>
          <MUI.Typography color={theme.palette.secondary.main} variant="h1" textAlign="left">
            {countries_data[countrycode_data]}
          </MUI.Typography>
        </MUI.Grid>
        <MUI.Grid item xs={12}>
          <AutocompleteComponent
            onChange={(e) => triggerDataFetch(e)}
            onSelect={(e) => triggerDataFetch(e)}
            label="Choose a country ID"
            options={Object.keys(countries_data).map(key => key)}
            data={countries_data}
          />
        </MUI.Grid>
        <MUI.Grid item xs={12} sm={6}>
          <MUI.Box>
            {!loadingMethaneData ? <BarChart category="Methane" label={methane_data} /> : <BasicLoader message={methaneError} />}
          </MUI.Box>
        </MUI.Grid>
        <MUI.Grid item xs={12} sm={6}>
          <MUI.Box>
            {!loadingCarbonMonoxideData ? <LineChart category="Carbon Monoxide" label={carbonmonoxide_data} /> : <BasicLoader message={carbonMonxideError} />}
          </MUI.Box>
        </MUI.Grid>
      </MUI.Grid >
    </>
  )
}

export default Dashboard