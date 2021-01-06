//GENERAL IMPORTS
import React from 'react';

//CUSTOM COMPONENTS
import { ButtonComponent } from './Button';

//MATERIAL-UI COMPONENTS
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

//STYLES
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    color: '#5f9ea0',
  },
}));

export const Person = ({ person }) => {
  const classes = useStyles();
  const date = new Date();
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const checkInDate = new Intl.DateTimeFormat('en-US', options).format(date); //RANDOM TIME FOR PRESENTATIONAL PURPOSES
  const checkOutDate = new Intl.DateTimeFormat('en-US', options).format(
    date.setHours(date.getHours() + 5)
  ); //RANDOM TIME FOR PRESENTATIONAL PURPOSES

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root}>
        <CardContent>
          <Typography paragraph>
            {`${person.firstName} ${person.lastName}`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {person.companyName && person.title
              ? `${person.title} at ${person.companyName}`
              : person.companyName
              ? person.companyName
              : person.title
              ? person.title
              : 'N/A'}
          </Typography>
          <Typography
            className={classes.time}
            variant="body2"
            color="textSecondary"
          >
            <span>Check-in: {checkInDate}</span>
            <span>Check-Out: {checkOutDate}</span>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ButtonComponent person={person} />
        </CardActions>
      </Card>
    </Grid>
  );
};
