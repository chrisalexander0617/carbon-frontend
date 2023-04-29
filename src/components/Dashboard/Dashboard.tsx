import { useEffect, useState, useRef } from 'react';
import { fetchMethaneData } from '../../api/methane/index';
import { fetchCountriesData } from '../../api/countries';
import { Grid, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { BarChart2 } from '../Charts/BarChart2'
import { IMethaneData } from '../../types/methane';
import CountryDropdown from '../CountryDropdown/CountryDropdown';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '20px',
    },
    card: {
      height: '100%',
    },
  })
) as () => Record<string, string>

export const Dashboard = () => {
  const classes = useStyles();
  const [methaneData, setMethaneData] = useState<IMethaneData[]>([])
  const [countriesData, setCountriesData] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [countryQuery, setCountryQuery] = useState<string>('US')
  const mounted = useRef(false)

  const cardsData = [
    { title: 'Card 1', content: <BarChart2 label={methaneData} /> }
  ];

  const getMethaneData = async () => {
    console.log('calling that shit', countryQuery)
    try {
      const result = await fetchMethaneData(countryQuery);

      if (mounted.current) {
        setMethaneData(result);
      }
    } catch (error) {
      console.log('failed that bitch')
      setError("Failed to fetch methane data");
    }
  }

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

  // not calling the server each time?

  const handleUpdateCountryQuery = async (e: any) => {
    // disable the dropdown while data is being fetched
    setCountryQuery(e);
    setError(null);
    try {
      await getMethaneData();
    } catch (error) {
      setError("Failed to fetch methane data");
    }
  }

  useEffect(() => {
    mounted.current = true
    if (mounted.current) getMethaneData()
    return () => { mounted.current = false };
  }, [])

  useEffect(() => {
    mounted.current = true
    if (mounted.current) getCountriesData()
    return () => { mounted.current = false };
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Button variant="contained" onClick={getMethaneData} value="click">Click Me!</Button>
          </Card>
          <Card>
            {countriesData ? <CountryDropdown handleUpdateCountryQuery={handleUpdateCountryQuery} options={countriesData} /> : <CircularProgress />}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            {methaneData.length ? <BarChart2 label={methaneData} /> : <CircularProgress />}
          </Card>
        </Grid>
        {cardsData.map((card, index) => (
          <Grid key={index} item xs={6} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
        }
      </Grid >
    </div >
  );
};