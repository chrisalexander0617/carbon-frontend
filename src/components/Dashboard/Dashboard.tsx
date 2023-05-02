import { useEffect, useState, useRef } from 'react'
import * as MUI from '@mui/material';
import AutocompleteComponent from '../AutoComplete/AutoComplete';
import { BarChart } from '../Charts/BarChart';
import { LineChart } from '../Charts/LineChart';
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
  const [loading, setLoading] = useState(true);
  const [loadingCarbonMonoxideData, setLoadingCarbonMonoxideData] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const mounted = useRef(false);
  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)
  const carbonmonoxide_data = useSelector((state: RootState) => state.carbonmonoxide.value)
  const countries_data = useSelector((state: RootState) => state.country.value)
  const countrycode_data = useSelector((state: RootState) => state.countryCode.value)

  const triggerDataFetch = (e: any) => {
    setError(null)
    setLoading(true)
    getMethaneData(mounted, dispatch, e, setError, setLoading)
    getCarbonMonoxideData(mounted, dispatch, e, setError, setLoadingCarbonMonoxideData)
    dispatch(setCountryCode(e))
  }

  useEffect(() => {
    mounted.current = true
    if (mounted.current) {
      if (!countries_data.length) {
        getCountriesData(mounted, dispatch, setError, setCountry)
      }

      getCarbonMonoxideData(mounted, dispatch, countrycode_data, setError, setLoadingCarbonMonoxideData)
      getMethaneData(mounted, dispatch, countrycode_data, setCountry, setLoading)
    }

    return () => { mounted.current = false };
  }, [])

  if (!countries_data) return <div><BasicLoader /></div>

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
            {!loading && methane_data.length > 0 ? <BarChart category="Methane" label={methane_data} /> : <BasicLoader message={error} />}
          </MUI.Box>
        </MUI.Grid>
        <MUI.Grid item xs={12} sm={6}>
          <MUI.Box>
            {!loadingCarbonMonoxideData && carbonmonoxide_data.length > 0 ? <LineChart category="Carbon Monoxide" label={carbonmonoxide_data} /> : <BasicLoader message={error} />}
          </MUI.Box>
        </MUI.Grid>
      </MUI.Grid >
    </>
  )
}

export default Dashboard
