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
  const mounted = useRef(false);

  const [loadingMethaneData, setLoadingMethaneData] = useState(false);
  const [loadingCarbonMonoxideData, setLoadingCarbonMonoxideData] = useState(false);

  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [methaneError, setMethaneError] = useState<string | null>(null)
  const [carbonMonxideError, setCarbonMonoxideError] = useState<string | null>(null)

  const dispatch = useDispatch()
  const methane_data = useSelector((state: RootState) => state.methane.value)
  const carbonmonoxide_data = useSelector((state: RootState) => state.carbonmonoxide.value)
  const listOfCountriesByKey = useSelector((state: RootState) => state.country.value)
  const selectedCountryCodeString = useSelector((state: RootState) => state.countryCode.value)

  const styles = { minHeight: 'auto', backgroundColor: theme.palette.primary.main }

  const triggerDataFetch = (e: any) => {
    dispatch(setCountryCode(e))
    getMethaneData(dispatch, e, setMethaneError, setLoadingMethaneData)
    getCarbonMonoxideData(dispatch, e, setCarbonMonoxideError, setLoadingCarbonMonoxideData)
  }

  useEffect(() => {
    mounted.current = true

    if (mounted.current) {
      /* Sets defaults */
      if (!listOfCountriesByKey.length) {
        getCountriesData(
          mounted,
          dispatch,
          setCountriesError,
          setCountry
        )
      }

      getMethaneData(
        dispatch,
        selectedCountryCodeString,
        setMethaneError,
        setLoadingMethaneData
      )

      getCarbonMonoxideData(
        dispatch,
        selectedCountryCodeString,
        setCarbonMonoxideError,
        setLoadingCarbonMonoxideData
      )
    }

    return () => { mounted.current = false };
  }, [])

  if (countriesError) return (
    <div>
      <BasicLoader
        height="100vh"
        message={countriesError}
      />
    </div>
  )

  return (
    <>
      <MUI.Grid sx={styles} container maxWidth="fluid" spacing={5} p={3}>
        <MUI.Grid item xs={12}>
          <MUI.Typography color={theme.palette.secondary.main} variant="h1" textAlign="left">
            {listOfCountriesByKey[selectedCountryCodeString]}
          </MUI.Typography>
        </MUI.Grid>
        <MUI.Grid item xs={12}>
          <AutocompleteComponent
            onChange={(e) => triggerDataFetch(e)}
            onSelect={(e) => triggerDataFetch(e)}
            label="Choose a country ID"
            options={Object.keys(listOfCountriesByKey).map(key => key)}
            data={listOfCountriesByKey}
          />
        </MUI.Grid>
        <MUI.Grid item xs={12} sm={6}>
          <MUI.Box>
            <BarChart
              category="Methane"
              label={methane_data}
              isLoading={loadingMethaneData}
              errorMessage={methaneError}
            />
          </MUI.Box>
        </MUI.Grid>
        <MUI.Grid item xs={12} sm={6}>
          <MUI.Box>
            <LineChart
              category="Carbon Monoxide"
              label={carbonmonoxide_data}
              isLoading={loadingCarbonMonoxideData}
              errorMessage={carbonMonxideError}
            />
          </MUI.Box>
        </MUI.Grid>
      </MUI.Grid >
    </>
  )
}

export default Dashboard