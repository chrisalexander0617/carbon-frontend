import React, { useEffect, useState, useRef } from 'react';
import { fetchMethaneData } from '../../api/methane/index';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import BarChart from '../Charts/BarChart'
import { IMethaneData } from '../../types/methane';

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

const cardsData = [
  { title: 'Card 1', content: 'Content for card 1' },
  { title: 'Card 2', content: 'Content for card 2' },
  { title: 'Card 3', content: 'Content for card 3' },
  { title: 'Card 4', content: 'Content for card 4' },
];

export const Dashboard = () => {
  const classes = useStyles();
  const [methaneData, setMethaneData] = useState<IMethaneData[]>([])
  const [error, setError] = useState<string | null>(null)

  const mounted = useRef(false)

  const getMethaneData = async () => {
    try {
      mounted.current = true;
      const result = await fetchMethaneData();
      if (mounted.current) {
        setMethaneData(result);
      }
    } catch (error) {
      console.error("Failed to fetch methane data:", error);
      setError("Failed to fetch methane data");
    }
  }

  useEffect(() => {
    mounted.current = true
    getMethaneData()
    return () => { mounted.current = false };
  }, [])

  console.log('Here is the methane data', methaneData)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <BarChart width={600} height={500} margin={{ top: 0, bottom: 0, left: 0, right: 0 }} />
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