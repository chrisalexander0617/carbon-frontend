import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
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