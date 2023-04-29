import React, { useEffect, useState, useRef } from 'react';
import { fetchMethaneData } from '../../api/methane/index';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { BarChart2 } from '../Charts/BarChart2'
import { IMethaneData } from '../../types/methane';
import { convertToReadableDateFormat } from '../../utils';
import Dropdown from '../Dropdown/Dropdown';

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
  const [error, setError] = useState<string | null>(null)

  const mounted = useRef(false)

  const cardsData = [
    { title: 'Card 1', content: <BarChart2 label={methaneData} /> },
    { title: 'Card 2', content: 'Content for card 2' },
    { title: 'Card 3', content: 'Content for card 3' },
    { title: 'Card 4', content: 'Content for card 4' },
  ];

  const getMethaneData = async () => {
    try {
      mounted.current = true;
      const result = await fetchMethaneData();
      if (mounted.current) {
        setMethaneData(result);
      }
    } catch (error) {
      setError("Failed to fetch methane data");
    }
  }

  useEffect(() => {
    mounted.current = true
    getMethaneData()
    return () => { mounted.current = false };
  }, [])

  const time = methaneData.map((item) => (
    convertToReadableDateFormat(item.time.interval_start)
  ))

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Dropdown options={['US', 'UK']} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <BarChart2 label={methaneData} />
          </Card>
        </Grid>
        {cardsData.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
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
        ))}
      </Grid>
    </div>
  );
};